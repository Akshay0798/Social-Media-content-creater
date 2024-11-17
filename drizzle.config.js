// eslint-disable-next-line import/no-anonymous-default-export
export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://neon%20database_owner:5hcj1XyrIYzi@ep-ancient-unit-a14585il.ap-southeast-1.aws.neon.tech/treadecraft_ai?sslmode=require",
    connectionString:
      "postgresql://neon%20database_owner:5hcj1XyrIYzi@ep-ancient-unit-a14585il.ap-southeast-1.aws.neon.tech/treadecraft_ai?sslmode=require",
  },
};
