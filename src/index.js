'use strict'

const core = require('@actions/core')
const differenceInDays = require('date-fns/differenceInDays')
const { logInfo, logError } = require('./log')
const { getLatestRelease, getAllCommits, getCommitsSinceLastRelease } = require('./release')
const { createIssue } = require('./createIssue')

async function run() {
  try {
    logInfo('========Starting to run the stale release github action ============')

    const daysSinceLastRelease = core.getInput('days-to-stale-release')

    console.log(`Days since last release: ${daysSinceLastRelease}`)
    console.log(`Fetching latest release......`)

    const latestRelease = await getLatestRelease()

    console.log(`Latest release - name:${latestRelease.name}, created:${latestRelease.created_at},
 Tag:${latestRelease.tag_name}, author:${latestRelease.author.login}`)

    const allCommits = await getAllCommits()

    console.log(JSON.stringify(allCommits))

    
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
