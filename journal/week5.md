# Week 5 — DynamoDB and Serverless Caching
In week 5, we implemented messages and messge groups using Dynamodb and create a Lambda function which is triggered when we add a new message.

There was need to add new api endpoints 'api/users/@<string:handle>/short' which would be where the new conversation would be. I also created a new frontend endpoint, 'mesages/new/handle which is ment to create a default conversation for the application.

A set of scripts were xreated for Dynamo db actions, schema load script to create the dynamo db
 schema load script   showing the format of data to be loaded into the application as messages, the seed script to load actual data the scan  script to scan the db schema and scripts to read and list convesrations in the database.

The potgres database when queried had mockk as the cognito user id, which would not be able to connect to amazon cognito so a script was created to modify the mok values to read the cognito user ids.

The list conversation script was further implemented to list the mock messages stored in the database which would represent actual conversatins between user 1 and user 2, this would create a message group for that particular conversation and so on. Then a new user was created and in the create user service, thrre was a conditional statement used to test if the conversation had a message group id or not, if it didn't then a new message group would be created for that conversation

Finally a Lambda function which used the production version which is triggered anythime a new message is sent, this was done using dynamodb streams and iam roles to enable the lambda function create, scand and delete items from the dynamodb dtabase.

