import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import type { QueryResolvers } from './../../../types.generated.js'
import type { PackageJson } from 'type-fest'

const packageJsonPath = resolve(import.meta.dirname, '../../../../../../../package.json')

export const version: NonNullable<QueryResolvers['version']> = async (_parent, _arg, _ctx) => {
  const packageJson = await readFile(packageJsonPath, 'utf8')
  const { version } = JSON.parse(packageJson) as PackageJson
  return version!
}
