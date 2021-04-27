'use strict'

const core = require('@actions/core')
const { logInfo } = require('./log')
const { getLatestRelease, getUnreleasedCommits } = require('./release')
const { createIssue } = require('./createIssue')

async function run() {
  try {
    logInfo('========Starting to run the stale release github action ============')

    // TODO: rename
    const daysSinceLastRelease = core.getInput('days-to-stale-release')

    console.log(`Days since last release: ${daysSinceLastRelease}`)
    console.log(`Fetching latest release......`)

    const latestRelease = await getLatestRelease()

    console.log(`Latest release - name:${latestRelease.name}, created:${latestRelease.created_at},
 Tag:${latestRelease.tag_name}, author:${latestRelease.author.login}`)

    const unreleasedCommits = await getUnreleasedCommits(latestRelease, daysSinceLastRelease)

    console.log(JSON.stringify(unreleasedCommits))

    if (unreleasedCommits.length) {
      createIssue(unreleasedCommits, daysSinceLastRelease)
    }

    
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
