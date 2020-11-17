import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as os from 'os'

function run(filename: string): string[] {
  process.env['INPUT_PROJ-PATH'] = path.join(__dirname, 'testdata', filename)
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptionsWithStringEncoding = {
    env: process.env,
    encoding: 'utf-8'
  }
  const exec = cp.spawnSync('node', [ip], options)
  if (exec.status != 0) {
    console.log(exec)
  }
  return exec.stdout.split(os.EOL)
}

test('Empty', () => {
  expect(run('empty.xml')).toEqual(
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
  expect(run('version.xml')).toEqual(
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
  expect(run('version_prefix.xml')).toEqual(
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
  expect(run('version_suffix.xml')).toEqual(
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
  expect(run('version_prefix_suffix.xml')).toEqual(
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
  expect(run('version_with_prefix_suffix.xml')).toEqual(
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
  expect(run('package_version.xml')).toEqual(
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
  expect(run('assembly_version.xml')).toEqual(
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
  expect(run('file_version.xml')).toEqual(
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
  expect(run('informational_version.xml')).toEqual(
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
