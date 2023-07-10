# Week 9 — CI/CD with CodePipeline, CodeBuild and CodeDeploy
https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiU1RWM1FHbnpFMW1RazliZ1JwbUFhOFE4YjA0WUo0RmJHbHVSc2d1TDhDMlRwclFXUVlWQVBQd01JT3QrdmhOMEtreGJKaE1xY0s0MlpRZVpRVmk1Rk1zPSIsIml2UGFyYW1ldGVyU3BlYyI6Imxla0dZV3VBOEJuUWl1U2YiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main

 WEEK 9 CODE PIPELINE
 create a branch in the repo called prod
 create a new pipline with the default options
 on the next page for service provider, select github, create a github connection it will promt you to install the application on your githyb account
 select relevant repos to grant access to
 select the equired repo and banch
 on the deploy stage, select ecs as the deploy service , locaate your ecs cluster and selct the backend service
 edit the code pipline to create the image definition json file
 edit the deploy and add a stage, edit the action group chose codebuild as the action provider
 select the source artifact for input artifact, create a new project using codebuild
 select github as the source and use oauth to authenticate, input the repository url
 set the webhook event filter to push and pull request merged
 enable preveiledge to be ablt to build docker image
 create a buildspec.yaml file for the codebuild and save it in the backend flask directory

 NB ensure the buildspec file is the root directory so that codebuild can see it, use the '*' to allow actions on all resources
 allow permissions for all ecr activities and codebvuild to avoid runiing into permission issues

 Edit the code pipeline with the successful code build
 set the action provider as codebuild
 set the input artifact as source artifact
 the project name will be the codebuild project
 you can also select a build typeof single build or batch build
 all other options can be set as dseired

 fixed the codepipeline codebuild by changing the branch to prod, so that the parameters can be read
