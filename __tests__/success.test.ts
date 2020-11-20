import * as os from 'os'
import { run, getFilePath } from './util'

test('Empty', () => {
  const exec = run(getFilePath('empty.xml'))
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
  const exec = run(getFilePath('version.xml'))
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
  const exec = run(getFilePath('version_prefix.xml'))
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
  const exec = run(getFilePath('version_suffix.xml'))
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
  const exec = run(getFilePath('version_prefix_suffix.xml'))
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
  const exec = run(getFilePath('version_with_prefix_suffix.xml'))
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
  const exec = run(getFilePath('package_version.xml'))
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
  const exec = run(getFilePath('assembly_version.xml'))
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
  const exec = run(getFilePath('file_version.xml'))
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

test('Informational', () => {
  const exec = run(getFilePath('informational_version.xml'))
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

