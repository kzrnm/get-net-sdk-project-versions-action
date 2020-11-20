import * as core from '@actions/core'
import {promises as fs} from 'fs'
import {DOMParser} from 'xmldom'

function put(name: string, value: string): void {
  core.info(`${name}: ${value}`)
  core.setOutput(name, value)
}

class DocumentWrapper {
  private docElement: HTMLElement
  constructor(docElement: HTMLElement) {
    this.docElement = docElement
  }
  getLastText(tagName: string): string | null {
    const nodes = this.docElement.getElementsByTagName(tagName)
    return nodes.length > 0 ? nodes[nodes.length - 1].textContent : null
  }

  static async createAsync(projPath: string): Promise<DocumentWrapper> {
    let xmlText: string
    try {
      xmlText = await fs.readFile(projPath, 'utf-8')
    } catch {
      throw new Error(`no such file: '${projPath}'`)
    }

    const domDoc = new DOMParser().parseFromString(xmlText, 'text/xml')
    if (!domDoc?.documentElement) {
      throw new Error(`failed to parse xml file: '${projPath}'`)
    }
    return new DocumentWrapper(domDoc.documentElement)
  }
}

async function run(): Promise<void> {
  try {
    const projPath = core.getInput('proj-path')
    core.debug(`proj-path=${projPath}`)

    const doc = await DocumentWrapper.createAsync(projPath)
    let versionPrefix = doc.getLastText('VersionPrefix')
    let versionSuffix = doc.getLastText('VersionSuffix')
    let version = doc.getLastText('Version')

    if (version) {
      const hyphenPos = version.indexOf('-')
      if (hyphenPos >= 0) {
        versionPrefix = version.substr(0, hyphenPos)
        versionSuffix = version.substr(hyphenPos + 1)
      } else {
        versionPrefix = version
        versionSuffix = ''
      }
    } else {
      if (!versionPrefix) {
        versionPrefix = '1.0.0'
      }

      if (versionSuffix) {
        version = `${versionPrefix}-${versionSuffix}`
      } else {
        version = versionPrefix
        versionSuffix = ''
      }
    }

    let packageVersion = doc.getLastText('PackageVersion')
    if (!packageVersion) {
      packageVersion = version
    }

    let assemblyVersion = doc.getLastText('AssemblyVersion')
    if (!assemblyVersion) {
      assemblyVersion = versionPrefix
    }

    let fileVersion = doc.getLastText('FileVersion')
    if (!fileVersion) {
      fileVersion = assemblyVersion
    }

    let informationalVersion = doc.getLastText('InformationalVersion')
    if (!informationalVersion) {
      informationalVersion = version
    }

    put('version', version)
    put('version-prefix', versionPrefix)
    put('version-suffix', versionSuffix)
    put('package-version', packageVersion)
    put('assembly-version', assemblyVersion)
    put('file-version', fileVersion)
    put('informational-version', informationalVersion)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
