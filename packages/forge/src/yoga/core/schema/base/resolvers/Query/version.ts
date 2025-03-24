import { readFile } from 'node:fs/promises'

import type { QueryResolvers } from './../../../types.generated.js'
import type { PackageJson } from 'type-fest'

export const version: NonNullable<QueryResolvers['version']> = async (_parent, _arg, _ctx) => {
  const packageJson = await readFile(new URL('../../../../../../../package.json', import.meta.url), 'utf8')
  const { version } = JSON.parse(packageJson) as PackageJson
  return version ?? 'unknown'
}
