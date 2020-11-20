import * as path from 'path'
import * as os from 'os'
import {run, getFilePath} from './util'

test('NotFound', () => {
  const exec = run(getFilePath('notfound.xml'))
  expect(exec.status).not.toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      `::error::no such file: '${path.join(
        __dirname,
        'testdata',
        'notfound.xml'
      )}'`
    ])
  )
})

test('Json', () => {
  const exec = run(getFilePath('invalid.json'))
  expect(exec.status).not.toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      `::error::failed to parse xml file: '${path.join(
        __dirname,
        'testdata',
        'invalid.json'
      )}'`
    ])
  )
})
