import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Recipes from "./collections/Recipes";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
  rateLimit: {
    trustProxy: true,
  },
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Users, Recipes],
  cors: ["http://localhost:4321", "https://chavez-boxing.vercel.app"],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  // graphQL: {
  //   schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  // },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
