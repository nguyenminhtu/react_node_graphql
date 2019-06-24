import { IResolvers } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload";

import userQuery from "./queries/userQuery";
import userMutation from "./mutations/userMutation";

import authMutation from "./mutations/authMutation";

import invitationQuery from "./queries/invitationQuery";
import invitationMutation from "./mutations/invitationMutation";

import addressQuery from "./queries/addressQuery";
import addressMutation from "./mutations/addressMutation";

const resolverMap: IResolvers = {
  Query: {
    ...userQuery,
    ...invitationQuery,
    ...addressQuery
  },
  Mutation: {
    ...userMutation,
    ...authMutation,
    ...invitationMutation,
    ...addressMutation
  },
  Upload: GraphQLUpload
};
export default resolverMap;
