import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

interface ProcessEnv {
  [key: string]: string | undefined
  TZ?: string
}

function copyEnv(): ProcessEnv {
  return Object.assign(process.env)
}

export function getFilePath(filename: string): string {
  return path.join(__dirname, 'testdata', filename)
}

export function run(projPath: string): cp.SpawnSyncReturns<string> {
  const newEnv = copyEnv()
  newEnv['INPUT_PROJ-PATH'] = projPath
  delete newEnv['GITHUB_OUTPUT']

  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptionsWithStringEncoding = {
    env: newEnv,
    encoding: 'utf-8'
  }
  return cp.spawnSync('node', [ip], options)
}
