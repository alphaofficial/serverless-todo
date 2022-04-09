import type { AWS } from "@serverless/typescript";
import {
  createTodo,
  getTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "@functions/todo/index";
import { config } from "dotenv";

config();

const serverlessConfiguration: AWS = {
  service: "aws-serverless-typescript-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
    },
  },
  // import the function via paths
  functions: { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "TodosTable",
          AttributeDefinitions: [
            {
              AttributeName: "todosId",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "todosId",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  useDotenv: true,
};
module.exports = serverlessConfiguration;
