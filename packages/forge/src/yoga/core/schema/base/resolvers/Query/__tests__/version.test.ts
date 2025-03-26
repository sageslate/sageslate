import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { version as version_ } from '../version.js'

import type { PackageJson } from 'type-fest'

const version = version_ as () => Promise<string>

const packageJsonPath = resolve(import.meta.dirname, '../../../../../../../../package.json')
const packageJson = await readFile(packageJsonPath, 'utf8')
const { version: versionValue } = JSON.parse(packageJson) as PackageJson

describe('version', () => {
  it('should return the version of the package', async () => {
    const result = await version()
    expect(result).toBe(versionValue)
  })
})
