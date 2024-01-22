import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import generateModule from '@babel/generator'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'
import * as t from '@babel/types'
import { camelCase, pascalCase } from '@sageslate/stone'

const filePath = resolve(process.cwd(), process.argv[2])

const generate = generateModule.default
const traverse = traverseModule.default

const fileContent = await readFile(filePath, 'utf8')

const abstractSyntaxTree = parse(fileContent, {
  plugins: ['typescript'],
  sourceType: 'module',
})

traverse(abstractSyntaxTree, {
  Identifier(path) {
    if (path.node.name.endsWith('Args')) {
      path.node.name = path.node.name.replace(/Args$/, 'Arguments')
    }
  },
  FunctionDeclaration(path) {
    const id = path.node.id

    if (!t.isIdentifier(id) || !id.name.startsWith('use')) {
      return
    }

    const isMutation = id.name.endsWith('Mutation')
    const mutationOrQuery = isMutation ? 'Mutation' : 'Query'

    const name = id.name.replace(/^use/, '').replace(/(?:Mutation|Query)$/, '')
    const camelCasedName = camelCase(name)
    const pascalCasedName = pascalCase(name)

    const bodyPath = path.get('body')

    const statementPaths = bodyPath.get('body')

    if (statementPaths.length !== 1) {
      return
    }

    const statementPath = statementPaths[0]
    const statement = statementPath.node

    if (!t.isReturnStatement(statement)) {
      return
    }

    const renames: Record<string, string> = {
      loading: `is${pascalCasedName}${mutationOrQuery}Loading`,
      error: `${camelCasedName}${mutationOrQuery}Error`,
      onError: `on${pascalCasedName}${mutationOrQuery}Error`,
      ...(isMutation
        ? {
            mutate: camelCasedName,
            called: `has${pascalCasedName}MutationCalled`,
            onDone: `on${pascalCasedName}MutationDone`,
          }
        : {
            result: `${camelCasedName}QueryResult`,
            variables: `${camelCasedName}QueryVariables`,
            refetch: `refetch${pascalCasedName}Query`,
            fetchMore: `fetchMore${pascalCasedName}Query`,
            subscribeToMore: `subscribeToMore${pascalCasedName}Query`,
            onResult: `on${pascalCasedName}QueryResult`,
          }),
    }

    bodyPath.pushContainer(
      'body',
      t.returnStatement(
        t.objectExpression(
          Object.values(renames).map(newName =>
            t.objectProperty(t.identifier(newName), t.identifier(newName), false, true),
          ),
        ),
      ),
    )

    statementPath.replaceWith(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.objectPattern(
            Object.entries(renames).map(([oldName, newName]) =>
              t.objectProperty(t.identifier(oldName), t.identifier(newName)),
            ),
          ),
          statement.argument,
        ),
      ]),
    )
  },
})

const { code } = generate(abstractSyntaxTree, { retainLines: true, retainFunctionParens: true }, fileContent)

await writeFile(filePath, code)
