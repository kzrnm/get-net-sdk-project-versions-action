import * as core from '@actions/core'
import { promises as fs } from 'fs'
import { DOMParser } from 'xmldom'

class DocumentWrapper {
  private docElement: HTMLElement
  constructor(docElement: HTMLElement) {
    this.docElement = docElement
  }
  getLastText(tagName: string): string | null {
    const nodes = this.docElement.getElementsByTagName(tagName)
    return nodes.length > 0 ? nodes[nodes.length - 1].textContent : null
  }
}


async function run(): Promise<void> {
  try {
    const projPath = core.getInput('proj-path')
    core.debug(`proj-path: ${projPath}`)
    const xmlText = await fs.readFile(projPath, 'utf-8')
    const doc = new DocumentWrapper(new DOMParser().parseFromString(xmlText, 'text/xml').documentElement)

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

    core.setOutput('version', version)
    core.setOutput('version-prefix', versionPrefix)
    core.setOutput('version-suffix', versionSuffix)
    core.setOutput('package-version', packageVersion)
    core.setOutput('assembly-version', assemblyVersion)
    core.setOutput('file-version', fileVersion)
    core.setOutput('informational-version', informationalVersion)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
