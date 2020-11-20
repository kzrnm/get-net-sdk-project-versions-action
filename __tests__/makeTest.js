const fs = require('fs').promises
const path = require('path')
const yaml = require('js-yaml')


class TestDefinition {
  constructor(key, conf) {
    this.testName = key
    if (typeof this.testName != 'string') {
      throw new Error(`invalid definition: ${key}`)
    }
    this.fileName = conf['filename']
    if (typeof this.fileName != 'string') {
      throw new Error(`invalid definition: ${key}:filename`)
    }

    const outputs = conf['outputs']
    this.version = outputs['version']
    if (typeof this.version != 'string') {
      throw new Error(`invalid definition: ${key}:version`)
    }
    this.versionPrefix = outputs['version-prefix']
    if (typeof this.versionPrefix != 'string') {
      throw new Error(`invalid definition: ${key}:version-prefix`)
    }
    this.versionSuffix = outputs['version-suffix']
    if (typeof this.versionSuffix != 'string') {
      throw new Error(`invalid definition: ${key}:version-suffix`)
    }
    this.packageVersion = outputs['package-version']
    if (typeof this.packageVersion != 'string') {
      throw new Error(`invalid definition: ${key}:package-version`)
    }
    this.assemblyVersion = outputs['assembly-version']
    if (typeof this.assemblyVersion != 'string') {
      throw new Error(`invalid definition: ${key}:assembly-version`)
    }
    this.fileVersion = outputs['file-version']
    if (typeof this.fileVersion != 'string') {
      throw new Error(`invalid definition: ${key}:file-version`)
    }
    this.informationalVersion = outputs['informational-version']
    if (typeof this.informationalVersion != 'string') {
      throw new Error(`invalid definition: ${key}:informational-version`)
    }
  }

  toTestTsCode() {
    return `test('${this.testName}', () => {
  const exec = run(getFilePath('${this.fileName}'))
  expect(exec.status).toStrictEqual(0)
  expect(exec.stdout.split(os.EOL)).toEqual(
    expect.arrayContaining([
      '::set-output name=version::${this.version}',
      '::set-output name=version-prefix::${this.versionPrefix}',
      '::set-output name=version-suffix::${this.versionSuffix}',
      '::set-output name=package-version::${this.packageVersion}',
      '::set-output name=assembly-version::${this.assemblyVersion}',
      '::set-output name=file-version::${this.fileVersion}',
      '::set-output name=informational-version::${this.informationalVersion}'
    ])
  )
})

`
  }
  toTestYmlCode() {
    const id = this.testName.replace(/ /g, '').replace(/&+/g, '-')
    return `      - uses: ./
        id: ${id}
        with:
          proj-path: __tests__/testdata/${this.fileName}
      - name: check ${id}
        run: |
          test "\${{steps.${id}.outputs.version}}" = "${this.version}" # version
          test "\${{steps.${id}.outputs.version-prefix}}" = "${this.versionPrefix}" # version-prefix
          test "\${{steps.${id}.outputs.version-suffix}}" = "${this.versionSuffix}" # version-suffix
          test "\${{steps.${id}.outputs.package-version}}" = "${this.packageVersion}" # package-version
          test "\${{steps.${id}.outputs.assembly-version}}" = "${this.assemblyVersion}" # assembly-version
          test "\${{steps.${id}.outputs.file-version}}" = "${this.fileVersion}" # file-version
          test "\${{steps.${id}.outputs.informational-version}}" = "${this.informationalVersion}" # informational-version

`
  }
}

async function loadYaml() {
  const testDefsPath = path.join(__dirname, 'testdata', 'success_list.yml')
  const testDefsStr = await fs.readFile(testDefsPath)
  return yaml.safeLoad(testDefsStr)
}

async function run() {
  const defs = []
  {
    const conf = await loadYaml()
    for (const key in conf) {
      const def = new TestDefinition(key, conf[key])
      defs.push(def)
    }
  }

  const successTestPath = path.join(__dirname, 'success.test.ts')
  await fs.writeFile(
    successTestPath,
    `import * as os from 'os'
import { run, getFilePath } from './util'

`
  )

  const testWrokflowPath = path.join(
    __dirname,
    '..',
    '.github',
    'workflows',
    'test.yml'
  )
  await fs.writeFile(
    testWrokflowPath,
    `name: "build-test"
on:
  pull_request:
  push:
    branches:
      - master
      - "releases/*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run all
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
`
  )

  for (const def of defs) {
    await fs.appendFile(successTestPath, def.toTestTsCode())
    await fs.appendFile(testWrokflowPath, def.toTestYmlCode())
  }
}
run()
