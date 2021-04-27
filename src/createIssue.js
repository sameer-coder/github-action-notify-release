'use strict'

const core = require('@actions/core')
const github = require('@actions/github')

async function createIssue(unreleasedCommits, daysSinceRelease) {
  try {
    const token = core.getInput('github-token', { required: true })
    const octokit = github.getOctokit(token)

    let commitStr = ''
    for(const commit of unreleasedCommits){
     commitStr = commitStr + 
      `Issue: ${commit.message}, Author: ${commit.author}}`
      + '\n'
    }
    let issueString = `Unreleased commits have been found which are pending since ${daysSinceRelease} days, please publish the changes.
Following are the commits:
${commitStr}`
    
    console.log(issueString)

    const issue = await octokit.issues.create({
      ...github.context.repo,
      title: 'Release pending!',
      body: issueString
    })

    console.log('New issue has been created. Issue No. - ', issue.data.number)
  } catch (error) {
    core.setFailed(error.message)
  }
}

exports.createIssue = createIssue
