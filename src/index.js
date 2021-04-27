'use strict'

const core = require('@actions/core')
const differenceInDays = require('date-fns/differenceInDays')
const { logInfo, logError } = require('./log')
const { getLatestRelease } = require('./getLastReleaseDate')
const { getLastRepoUpdate } = require('./getLastRepoUpdate')
const { createIssue } = require('./createIssue')

async function run() {
  try {
    logInfo('========Starting to run the stale release github action ============')

    const daysSinceLastRelease = core.getInput('days-to-stale-release')

    console.log(`Days since last release: ${daysSinceLastRelease}`)
    console.log(`Fetching latest release......`)

    const latestRelease = await getLatestRelease()

    console.log(`Latest release - name:${latestRelease.name}, created:${latestRelease.created_at},
 Tag:${latestRelease.tag_name}, author:${latestRelease.author}`)

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
