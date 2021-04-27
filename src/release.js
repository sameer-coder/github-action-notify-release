'use strict'

const core = require('@actions/core')
const { logInfo } = require('./log')
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

async function getAllCommits(latestRelease) {
  const token = core.getInput('github-token', { required: true })
  const octokit = github.getOctokit(token)
  const { owner, repo } = github.context.repo;

  // TODO: extract this out
  const allCommitsResp = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner,
    repo
  })

  console.log(allCommitsResp.data)
  const allCommits = []
  const lastReleaseDate = new Date(latestRelease.created_at)

  for (const commit of allCommitsResp.data) {
    const commitDate = new Date(commit.commit.committer.date)
    if (lastReleaseDate < commitDate) {
      allCommits.push({ message: commit.commit.message, author: commit.author.login,
      date: commitDate, url: commit.url});
    }
  }

  return allCommits;
}

async function getCommitsSinceLastRelease(lastRelease, allCommits) {
  return null
}

module.exports = {
  getLatestRelease,
  getAllCommits,
  getCommitsSinceLastRelease
}