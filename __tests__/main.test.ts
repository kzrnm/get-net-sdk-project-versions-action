import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as os from 'os'

function run(filename: string): cp.SpawnSyncReturns<string> {
  process.env['INPUT_PROJ-PATH'] = path.join(__dirname, 'testdata', filename)
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptionsWithStringEncoding = {
    env: process.env,
    encoding: 'utf-8'
  }
  return cp.spawnSync('node', [ip], options)
}

test('NotFound', () => {
  const exec = run('notfound.xml')
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
  const exec = run('invalid.json')
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

test('Empty', () => {
  const exec = run('empty.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::1.0.0',
      '::set-output name=version-prefix::1.0.0',
      '::set-output name=version-suffix::',
      '::set-output name=package-version::1.0.0',
      '::set-output name=assembly-version::1.0.0',
      '::set-output name=file-version::1.0.0',
      '::set-output name=informational-version::1.0.0'
    ])
  )
})

test('Verson', () => {
  const exec = run('version.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('VersonPrefix', () => {
  const exec = run('version_prefix.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::3.4.2',
      '::set-output name=version-prefix::3.4.2',
      '::set-output name=version-suffix::',
      '::set-output name=package-version::3.4.2',
      '::set-output name=assembly-version::3.4.2',
      '::set-output name=file-version::3.4.2',
      '::set-output name=informational-version::3.4.2'
    ])
  )
})

test('VersonSuffix', () => {
  const exec = run('version_suffix.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::1.0.0-alpha.2',
      '::set-output name=version-prefix::1.0.0',
      '::set-output name=version-suffix::alpha.2',
      '::set-output name=package-version::1.0.0-alpha.2',
      '::set-output name=assembly-version::1.0.0',
      '::set-output name=file-version::1.0.0',
      '::set-output name=informational-version::1.0.0-alpha.2'
    ])
  )
})

test('VersonPrefix && VersonSuffix', () => {
  const exec = run('version_prefix_suffix.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('Verson && VersonPrefix && VersonSuffix', () => {
  const exec = run('version_with_prefix_suffix.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('PackageVersion', () => {
  const exec = run('package_version.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta-1.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('AssemblyVersion', () => {
  const exec = run('assembly_version.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0.227',
      '::set-output name=file-version::2.0.0.227',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('FileVersion', () => {
  const exec = run('file_version.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0.21',
      '::set-output name=informational-version::2.0.0-beta.1'
    ])
  )
})

test('informational', () => {
  const exec = run('informational_version.xml')
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::v2 beta'
    ])
  )
})
