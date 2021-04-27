'use strict'

const core = require('@actions/core')
const github = require("@actions/github")


async function getLatestRelease() {
  const token = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(token)
  const { owner, repo } = github.context.repo;

  const allReleasesResp = await octokit.request(`GET /repos/{owner}/{repo}/releases`, {
    owner,
    repo
  })

  const latestRelease = (allReleasesResp && allReleasesResp.data && allReleasesResp.data.length) ? allReleasesResp.data[0] : null
  if (!latestRelease) throw new Error('Cannot find the latest release')

  return latestRelease
}

async function getUnreleasedCommits(latestRelease, daysSinceLastRelease) {
  const token = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(token)
  const { owner, repo } = github.context.repo;

  // TODO: extract this out
  const allCommitsResp = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo
  })

  const unreleasedCommits = []
  const lastReleaseDate = new Date(latestRelease.created_at).getTime()
  let staleDate = new Date().getTime()
  if(daysSinceLastRelease > 0) {
    staleDate = new Date().getTime() - (daysSinceLastRelease * 24 * 60 * 60 * 1000); //stale days timestamp
  }


  for (const commit of allCommitsResp.data) {
    const commitDate = new Date(commit.commit.author.date).getTime()

  if (lastReleaseDate < commitDate && commitDate < staleDate) {
    console.log('lastReleaseDate',lastReleaseDate);
    console.log('commitDate',commitDate);
    console.log('staleDate',staleDate);
    console.log("-----------------------------");
    unreleasedCommits.push({ message: commit.commit.message, author: commit.commit.author.name,
    date: commitDate, url: commit.url});
  }
}

  return unreleasedCommits;
}

module.exports = {
  getLatestRelease,
  getUnreleasedCommits
}