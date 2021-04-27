'use strict'

const core = require('@actions/core')
const differenceInDays = require('date-fns/differenceInDays')
const { logInfo, logError } = require('./log')
const { getLastReleaseDate } = require('./getLastReleaseDate')
const { getLastRepoUpdate } = require('./getLastRepoUpdate')
const { createIssue } = require('./createIssue')

async function run() {
  try {
    logInfo('========Starting to run the stale release github action ============')

    const daysToStaleRelease = core.getInput('days-to-stale-release')

    const latestRelease = await getLastReleaseDate()

    logInfo(`Latest release is ${latestRelease}`)

    // const lastRepoUpdate = await getLastRepoUpdate()

    // const daysSinceRelease = differenceInDays(lastRepoUpdate, lastReleaseDate)

    // logInfo(`${daysSinceRelease} Days since last release`)

    // const shouldCreateIssue = daysToStaleRelease < daysSinceRelease

    // if (shouldCreateIssue) {
    //   createIssue(daysSinceRelease)
    // }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
