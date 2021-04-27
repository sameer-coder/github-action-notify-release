'use strict'

const core = require('@actions/core')
const { logInfo } = require('./log')
const github = require("@actions/github")


async function getLatestRelease() {

  try {
    const token = core.getInput('github-token', { required: true })
    const octokit = github.getOctokit(token)

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = github.context.repo;

    const allReleasesResp = await octokit.request(`GET /repos/{owner}/{repo}/releases`, {
      owner,
      repo
    })

    const latestRelease = (allReleasesResp && allReleasesResp.data && allReleasesResp.data.length) ? allReleasesResp.data[0] : null
    if (!latestRelease) throw new Error('Cannot find the latest release')

    console.log(`Latest release - name:${latestRelease.name}, created:${latestRelease.created_at},
 Tag:${latestRelease.tag_name}, author:${latestRelease.author}`)

    return latestRelease
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

exports.getLatestRelease = getLatestRelease
