import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as os from 'os'

function run(filename: string): string[] {
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: {
      'INPUT_PROJ-PATH': path.join(
        __dirname,
        'testdata',
        filename
      )
    }
  }
  return cp.execSync(`node ${ip}`, options).toString().split(os.EOL)
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
      '::set-output name=informational-version::1.0.0',
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
      '::set-output name=informational-version::2.0.0-beta.1',
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
      '::set-output name=informational-version::3.4.2',
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
      '::set-output name=informational-version::1.0.0-alpha.2',
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
      '::set-output name=informational-version::2.0.0-beta.1',
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
      '::set-output name=informational-version::2.0.0-beta.1',
    ])
  )
})



test('PackageVersion', () => {
  expect(run('package.xml')).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1',
    ])
  )
})

test('AssemblyVersion', () => {
  expect(run('assembly.xml')).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1',
    ])
  )
})

test('FileVersion', () => {
  expect(run('file.xml')).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1',
    ])
  )
})

test('informational', () => {
  expect(run('file.xml')).toEqual(
    expect.arrayContaining([
      '::set-output name=version::2.0.0-beta.1',
      '::set-output name=version-prefix::2.0.0',
      '::set-output name=version-suffix::beta.1',
      '::set-output name=package-version::2.0.0-beta.1',
      '::set-output name=assembly-version::2.0.0',
      '::set-output name=file-version::2.0.0',
      '::set-output name=informational-version::2.0.0-beta.1',
    ])
  )
})
