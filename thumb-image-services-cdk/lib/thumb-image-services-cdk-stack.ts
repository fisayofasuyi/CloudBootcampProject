import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// const dotenv = require('dotenv')

dotenv.config()

export class ThumbImageServicesCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName:string  = process.env.THUMBING_BUCKET_NAME as string; //will throw an error if bucket name is null

    const functionPath:string = process.env.THUMBING_FUNCTION_PATH as string
    const folderInput:string = process.env.FOLDER_INPUT as string;
    const folderOutput:string = process.env.FOLDER_OUTPUT as string;

 
    const bucket = this.createBucket(bucketName);
    const lambda = this.createLambda(functionPath, bucketName,folderInput, folderOutput );
 
  
  }

  createBucket(bucketName:string): s3.IBucket {
   const bucket = new s3.Bucket(this, 'ThumbingBucket', {
    bucketName: bucketName,
    removalPolicy: cdk.RemovalPolicy.DESTROY
   })
   return bucket;
  }

  createLambda(functionPath: string, bucketName:string, folderInput:string, folderOutput:string):lambda.IFunction {
   const lambdaFunction = new lambda.Function(this, 'ThumbLambda', {
     runtime: lambda.Runtime.NODEJS_18_X,
     handler: 'index.handler',
     code: lambda.Code.fromAsset(functionPath),
     environment: {
      DEST_BUCKET_NAME: bucketName,
      FOLDER_INPUT: folderInput,
      FOLDER_OUTPUT: folderOutput,
      PROCESS_WIDTH:'512',
      PROCESS_HEIGHT:'512'
     }
   })
   return lambdaFunction;
  }
}



