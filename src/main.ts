import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const projPath = core.getInput('proj-path')
    core.debug(`proj-path: ${projPath}`)

    core.setOutput('version', projPath)
    core.setOutput('version-prefix', projPath)
    core.setOutput('version-suffix', projPath)
    core.setOutput('package-version', projPath)
    core.setOutput('assembly-version', projPath)
    core.setOutput('file-version', projPath)
    core.setOutput('informational-version', projPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
