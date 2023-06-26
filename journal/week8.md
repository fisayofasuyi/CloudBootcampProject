# Week 8 — Serverless Image Processing

services are grouped into what is called constructs
CDKS have 3 levels with level 1 being the most primitive
l2 adds more customizations to the cdk, l1 construct uses cfn bucket while l2 uses s3 bucket

using the cdk constructs we would create services for:
an s3 bucket
lambda function to process images

make a folder for the aws cdk and its dependencies
install dependencies using npm install aws-cdk -g  - install globally

initialize the cdk with 'cdk init app --language typescript'

all our structures will reside in the lib folder

the codebase library is written in typescript and uses JSII  to convert into other languages

any object that has cfn in front of it is a level 1 construct

we add an s3 bucket name whose name will be derived from environment variables:
const bucketName:string  = process.env.THUMBING_BUCKET_NAME as string;

then we create a bucket as a new method in the class defined:
createBucket(bucketName:string) {
const bucket = new s3.Bucket(this, 'ThumbingBucket', {
bucketName: bucketName,
removalPolicy: cdk.RemovalPolicy.DESTROY
})
}

we use the createbucket method in the main class for the bucket we defined as use cdk 
synth(Synthesizes and prints the CloudFormation template for this stack)


to avoid erors with cdk synth, we use it in the directory that has the cdk.json file, else we use
cdk synth --app path/of/cdk.json

after running synth, the template is stored in a directory called cdk.out

you can bootstap the cdk and check the cloudformation templates by typing
cdk bootstrap 'aws://account-id' 
cdk bootstrap "aws://952560381965/us-east-1" 

then run cdk deploy to deploy the app


create a lambda function:
createLambda(functionPath: string):lambda.IFunction {
const lambdaFunction = new lambda.Function(this, 'ThumbLambda', {
runtime: lambda.Runtime.NODEJS_18_X,
handler: 'index.handler',
code: lambda.Code.fromAsset(functionPath)
})

}

'functionPath' argument will also be an environment varaible so we create a .env file and
store the varaibles there

for the environment variables, we can use the dotenv module to read the envars i.e
npm install dotenv
const dotenv = requir('dotenv')
dotenv.configure()

NB the bucket name has to be unique
How to remove an s3 bucket that has versioning(CLI)
aws s3api list-object-versions --bucket bucketname - list the versions of the bucket
aws s3api delete-object --bucket DOC-EXAMPLE-BUCKET1 --key test.txt --version-id versionID - delete the bucket objects with key and version id
aws s3 rb s3://buckettName   --force - remove the bucket with force

aws s3api delete-object --bucket cdk-hnb659fds-assets-952560381965-us-east-1 --key "23137a6afef8ffe8a2ec3138e0dc9dce58907ece5f31bc279795d2bd08faee8d.json" --version-id t2Nph0z3Od2kImmd0FKhSITvt84OglGt && aws s3api delete-object --bucket cdk-hnb659fds-assets-952560381965-us-east-1 --key "2dcb77afbfba608820a6ca84eb3f85b7091376533121652966314575f2bd2312.zip" --version-id ajtJYJ84xR92F3LU_hbXPtpP06uljjOM

create an uploads bucket,
an asstets bucket that points to assets.fisayofasuyi.tech,
a webhook url that points to api.fisayofasuyi.tech/webhooks/avatars
a thumbing topic name for sns topics
a thumbing function path - ../aws/lanbdas/processed-images


cd into the processed images and install the node modules
initilize the folder and install sharpjs - npm install sharpjs
install aws s3 module npm install @aws-sdk/client-s3

install sharp with the required flags
npm install
rm -rf node_modules/sharp
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp


create an s3 event notification to lambda for the uploads bucket and check if it triggers an event
if a new object is added to the bucket
then cdk synth to check for errors
cdk deploy again

USE CDK DESTROY TO DESTROY A STACK

create a function to import the s3 bucket into the cdk stack
importBucket(bucketName: string): s3.IBucket {
    const bucket = s3.Bucket.fromBucketName(this,"AssetsBucket",bucketName);
    return bucket;
  }

create an s3 bucket which would be managed manually
then make two folders in the assets.fisayofasuyi.tech, original and processed for the images
to use the cli to copy data into an s3 bucket we use : 
aws s3 cp filepath s3://bucket_name/folderforimage

in our case aws s3 cp "pexels-sebastiaan-stam-1097456.jpg" "s3://assets.fisayofasuyi.tech/avatar/original/data.jpg"

aws s3 cp "test.jpg" "s3://cruddur-uploaded-avatars-1993/avatars/original/data.jpg"

and to remove the image, we use

aws s3 rm "s3://assets.fisayofasuyi.tech/avatar/original/pexels-sebastiaan-stam-1097456.jpg"

use aws s3 ls to list the buckets


aws cloudformation delete-stack --stack-name ThumbImageServicesCdkStack --region us-east-1 - delete a cloud formation stack

aws cloudformation delete-stack --stack-name ThumbImageServicesCdkStack --region us-east-1 --role-arn arn:aws:iam::952560381965:role/CloudFormRole - delete a cloudfromation stack with another role
if the assumed role does not exist or if there is an error deleting a role in the stack (it works)

delete all resources and check the optional checkbox to keep resources preventing deletion

The issue with log groups not showing when i add an image to the s3 bucket was resolved by:
changing the s3.EventType.OBJECT_CREATED_POST to  s3.EventType.OBJECT_CREATED_PUT in the create notify lambda function in the CDK stack

The issue with the lambda function timing out when uploading the image was because the image i had before was too large, had to use a smaller image


create sns topics for the processed images.

SERVINGE IMAGES OVER CLOUDFRONT
had to go into the bucket i.e assets.fisayofasuyi.tech/avatars/processed/data.jpg and allow read and write to the public to remove the unauthorised error
once this is done, you can try from the cloud front distribution domain name to see if it works cldfdomain/avatars/processed/data.jpg

implement users profile page

write a script to run other scripts - bootstrap
create a new database query to show the logged in user infromation
create a new component edit profile button to edit the user profile
having issues with the profile page change the version of react router to 6.4.3 and run npm install again

add conditionals so that that the loadData function shows the other navigation items
create an edit profile button for the notification page
add iamges served from the assets bucket to the notification page, one as the avatar and one as the background image

IMPLEMENT MIGRATIONS BACKEND ENDPOINT AND PROFILE FORM
Create a jsonconfig.json file and add configurations
{
    "compilerOptions": {
        "baseUrl": "src"
    },
    "include": ["src"]
}

This way we can now refrence imorts/exports with the relative paths instead of the absolute paths
add an extra component called popup and set it in the app.js file, this way when the edit profile button is clicked, the 
form box overlaps the main page

we create an endpoint and a service for the update profile in order to save user input from the profile form and implement the service which chesks if
the values supplied are empty or contain errors and returns the corresponding response.


We add a db miigration folder with a tiimestamp which rollbacks to the last time the database was error free, this genarates a
rollback file with te timestamp as the name of the file.

create a table called schema_information to store infromattion on the last successful database state or deployment


IMPLEMENT AVATAR UPLOADING
create a lambda function using API gateway to upload 
use the ruby to icreate a presigned url to upload files into the s3 uploads bucket
install ruby with sudo apt installl ruby and sudo apt install ruby-bundle
bundle init - this creates a gemfile whee you can specify packages to be installed.
bundle install to install packages specified in the gemfile

The issue with the ruby bundle was fixed by using sudo bundle install
and then bundle exec ruby function.rb, you also have to specify the aws region for it to work
once all that is done, the function should now generate a presigned url

test the presigned url using thunder client  with a put method as stated in the function
The presigned urll is used to graant permission to get/post/put into our s3 bucket

the function used was:
require 'aws-sdk-s3'

s3 = Aws::S3::Resource.new
bucket_name = ENV['UPLOADS_BUCKET_NAME']
object_key = 'mock.jpg'


obj = s3.bucket(bucket_name).object(object_key)
url = obj.presigned_url(:put, expires_in:3600)

puts url

move the code to aws lambda and add an inline permission to put on an s3 bucket, specify the arn of the s3 bucket
and allow actions on  all items in the bucket i.e allow *
set environment variables in the lamda configuration and add the bucket to it
zip the lambda code and upload ot to the new lambda function for api gateway

then create the api gateway using your domian as the route and use the GET request to get files from the avatars/ bucket
use the avatar upload lambda as the lambda to use

once the gateway is created, use the api gateway authorizer lambda in the create authorizer option

for issues with cors, we add another route to the api gateway with metod for options on a proxy route
