import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

export function getFilePath(filename: string): string {
  return path.join(__dirname, 'testdata', filename)
}

export function run(projPath: string): cp.SpawnSyncReturns<string> {
  process.env['INPUT_PROJ-PATH'] = projPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptionsWithStringEncoding = {
    env: process.env,
    encoding: 'utf-8'
  }
  return cp.spawnSync('node', [ip], options)
}
