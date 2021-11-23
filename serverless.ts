import type { AWS } from '@serverless/typescript';

import quotes from '@functions/quotes';
import average from '@functions/average';
import slippage from '@functions/slippage';
import dynamoTest from '@functions/dynamoTest';

const serverlessConfiguration: AWS = {
  service: 'pluggy-back',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'sa-east-1',
    stage: "${opt:stage, 'dev'}",
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:*"
        ],
        Resource: "*"
      }
    ]
  },
  // import the function via paths
  functions: { quotes, average, slippage, dynamoTest },
  resources: {
    Resources: {
      MyDinamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: "${self:custom.tableName}",
          AttributeDefinitions: [
            {
              "AttributeName": "ID",
              "AttributeType": "S"
            }
          ],
          "KeySchema": [
            {
              "AttributeName": "ID",
              "KeyType": "HASH"
            }
          ],
          "BillingMode": "PAY_PER_REQUEST"
        }
      }
        
    }
  },
  package: { individually: true },
  custom: {
    tableName: "quotes-info",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
