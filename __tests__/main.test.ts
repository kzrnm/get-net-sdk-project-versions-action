import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('verson tag', () => {
  process.env['INPUT_PROJ-PATH'] = path.join(
    __dirname,
    'testdata',
    'version.xml'
  )
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  const output = cp.execSync(`node ${ip}`, options).toString()
  console.log(output)
})
