/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./../types.generated.js";
import { AdminAuthenticationResult } from "./resolvers/AdminAuthenticationResult.js";
import { AdminMutation } from "./resolvers/AdminMutation.js";
import { AdminQuery } from "./resolvers/AdminQuery.js";
import { admin as Mutation_admin } from "./resolvers/Mutation/admin.js";
import { admin as Query_admin } from "./resolvers/Query/admin.js";
import { isInitialized as Query_isInitialized } from "./resolvers/Query/isInitialized.js";
import { realms as Query_realms } from "./resolvers/Query/realms.js";
import { Realm } from "./resolvers/Realm.js";
import { DateTimeResolver } from 'graphql-scalars';
export const resolvers: Resolvers = {
  Query: { admin: Query_admin, isInitialized: Query_isInitialized, realms: Query_realms },
  Mutation: { admin: Mutation_admin },

  AdminAuthenticationResult: AdminAuthenticationResult,
  AdminMutation: AdminMutation,
  AdminQuery: AdminQuery,
  Realm: Realm,
  DateTime: DateTimeResolver
};