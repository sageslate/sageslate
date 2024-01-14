/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { AdminAuthenticationResult } from './graphql/resolvers/AdminAuthenticationResult';
import    { AdminMutation } from './graphql/resolvers/AdminMutation';
import    { AdminQuery } from './graphql/resolvers/AdminQuery';
import    { admin as Mutation_admin } from './graphql/resolvers/Mutation/admin';
import    { admin as Query_admin } from './graphql/resolvers/Query/admin';
import    { Realm } from './graphql/resolvers/Realm';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { admin: Query_admin },
      Mutation: { admin: Mutation_admin },
      
      AdminAuthenticationResult: AdminAuthenticationResult,
AdminMutation: AdminMutation,
AdminQuery: AdminQuery,
Realm: Realm,
DateTime: DateTimeResolver
    }