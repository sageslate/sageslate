/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./../types.generated.js";
import { users as Query_users } from "./resolvers/Query/users.js";
import { User } from "./resolvers/User.js";
import { DateTimeResolver } from 'graphql-scalars';
export const resolvers: Resolvers = {
  Query: { users: Query_users },


  User: User,
  DateTime: DateTimeResolver
};