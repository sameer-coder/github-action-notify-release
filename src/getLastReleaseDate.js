'use strict'

const core = require('@actions/core')
const packageJson = require('../package.json')
const { exec } = require('./exec')
const { logInfo } = require('./log')
const { GitHub, context } = require("@actions/github")

async function getLastReleaseDate() {
  try {
    // const packageName = packageJson.name

    // logInfo(`Current npm package ${packageName}`)

    // const { output, error } = await exec({
    //   cmd: 'npm',
    //   args: ['info', packageName, 'time', '--json'],
    //   parseType: 'json'
    // })

    // if (error) {
    //   return {
    //     npmError: error,
    //     npmPckNotFound: error.includes('npm ERR! 404'),
    //   }
    // }

    // const lastReleaseDate = new Date(output.modified)

    // logInfo(`Last release date ${lastReleaseDate}`)

    // return { lastReleaseDate }

    return await getAllReleases()
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function getAllReleases() {

  try {
    const token = core.getInput('github-token', { required: true })
    const github = new GitHub(token);
    const octokit = github.getOctokit(token)

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    const allReleases = await octokit.request(`GET /repos/{owner}/{repo}/releases`, {
      owner,
      repo
    })

    logInfo(`All releases: '${allReleases}`)
    console.log(`All releases: '${allReleases}`)

    return allReleases.length ? allReleases[0] : null
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

exports.getLastReleaseDate = getLastReleaseDate
