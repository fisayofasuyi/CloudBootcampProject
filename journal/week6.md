# Week 6 — Deploying Containers

CREATE A SCRIPT THAT DOES A HEATLTH CHECK FOR THE ECS BACKEND CONTAINER
A test script for container connection with psql db, and log out the message if successful or if failed, the connection URL would be the one set on aws,we then add a health check endpoint to the application that returns a status code of 200




CREATE A CLUSTER FOR THE SERVICES
serviceConnectDefaults
create image repositories for the services
create a cloud watch group on aws for the cluster with retention of 1 day

CREATE REPOSITORIES ADD IMAGES TO THE ECR REPOSITORIES
pull python 3.10:slimbuster image from docker
tag the python image with our ecr repo
docker tag python:3.10-slim-buster $ECR_PYTHON_URL:3.10-slim-buster

CREATE AN  REPO FOR FLASK
aws ecr create-repository \
--repository-name backend-flask \
--image-tag-mutability MUTABLE

build the image RM in the backend-flask repo
docker build -t backend-flask .

tag the image

push the image


build the image for the frontend setting environment variables for the container

docker build \
--build-arg REACT_APP_BACKEND_URL="http://api.fisayofasuyi.tech" \ 
--build-arg REACT_APP_AWS_PROJECT_REGION="us-east-1" \
--build-arg REACT_APP_AWS_COGNITO_REGION="us-east-1" \
--build-arg REACT_APP_AWS_USER_POOLS_ID="us-east-1_GytnSn5Lo" \
--build-arg REACT_APP_CLIENT_ID="1leg188bgfi4r4qmjtfo1r85g7" \
-t frontend-react-js \
-f Dockerfile.prod .

tag the image

test the image in a container to see if it is working
push the image to the ECR REPO
then create the task definition for the frontend


CREATE TASK DEFINITIONS TO RUN NEW TASKS

services are also called tasks
tasks - created to run and end
service - created to run continuously 

to create a task definition, we need a configuration file similar to a docker-compose file

then we create a service execution policy

add an  iam role for the service execution

aws iam create-role \
--role-name CruddurServiceExecutionRole \
--assume-role-policy-document file://aws/policies/service-assume-role-policy.json

create a policy for essions manger access

aws iam put-role-policy \
--policy-name CruddurServiceExecutionPolicy \
--role-name CruddurServiceExecutionRole \
--policy-document file://aws/policies/service-execution-policy.json

then attach the role policy
aws iam attach-role-policy \
--policy-arn arn:aws:iam::ssm::aws:policy/service-role/AmazonECSTaskExecutionPolicy \
--role-name CruddurServiceExecutionRole

create parameters for the resource in the policy using aws systems manager, which helps to store parameters using the cli:

aws ssm put-parameter \
    --name "parameter-name" \
    --value "parameter-value" \
    --type String \
    --tags "Key=tag-key,Value=tag-value"

aws ssm put-parameter \
    --name "parameter-name" \
    --value "parameter-value" \
    --type String \
    --tags "Key=tag-key,Value=tag-value"


CREATE THE TASK ROLE 

aws iam create-role \
--role-name CruddurTaskRole \
--assume-role-policy-document file://aws/policies/cruddur-task-role.json


aws iam put-role-policy \
--policy-name SSMAccessPolicy \
--role-name CruddurTaskRole \
--policy-document file://aws/policies/ssm-access-policy.json




you can either attach role policy via a custom policy document or an arn policy

aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/CloudWatchFullAccess --role-name CruddurTaskRole

aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess --role-name CruddurTaskRole



Register the task definitionS
aws ecs register-task-definition --cli-input-json file://aws/task-definitions/backend-flask.json

create a security group via aws cli:

export DEFAULT_VPC_ID=$(aws ec2 describe-vpcs \
--filters "Name=isDefault, Values=true" \
--query 'Vpcs[*].VpcId' \
--output text)
echo $DEFAULT_VPC_ID

export DEFAULT_SUBNET_IDS=$(aws ec2 describe-subnets \
--filters Name=vpc-id,Values=$DEFAULT_VPC_ID \
--query 'Subnets[*].SubnetId' \
--output json | jq -r 'join(",")') 
echo $DEFAULT_SUBNET_IDS

export CRUD_SERVICE_SG=$(aws ec2 create-security-group \
--group-name "crud-srv-sg" \
--description "Security group for cruddur services on ECS" \
--vpc-id $DEFAULT_VPC_ID \
--query "GroupId" --output text)

authorize port for security group
aws ec2 authorize-security-group-ingress \
--group-id $CRUD_SERVICE_SG \
--protocol tcp \
--port 80 \
--cidr 0.0.0.0/0

creating a service for ecr game me issues
had to:
attach ecr logs authorization policy to the role
attach ecr create log stream policy to the role 
de-register and reregister the task definition with the correct aws ecr image for container
add :Latest to the aws ecr image
service started and stopped, also issue with connection pool(psql)
run it with the cli instead



CREATE ECS SERVICES USING THE AWS CLI
create a service json file with all the configurations
aws ecs create-service --cli-input-json file://aws/json/service-backend-flask.json
issue with the nulltype for pool is caused by the application not seeing the connection url
once the service is up, add the service connect optons to the json file and add a namespace.

CREATE A LOAD BALANCER
when creating the load balancer, select application, adjust the security groups in the inbound rules for the ecs task to point to only the load balancer id on port 4567

create target groups for the frontend and backend
both should say ip address as  the ecs uses ip addresses
frontend port 4567
backend port 3000

use the newly created target groups in the load balancer creation

use aws ecs create-service --generate-cli-skeleton to generate an ecs template
specify the details(arns) for the load balancer in the create service file

once the service starts, check the load balancer and see if you can access the url on port 4567

create s3 backet for cloudwatch logs(optional)

start on the frontend react js

use the dns from the load balancer


REBUILD THE DOCKER IMAGES ADDING THE LOAD BALANCER TO THE TASK DEFINITION

rebuild the docker image with the proper load balancer dns, not gitpod url
'cruddur-alb-1438102867.us-east-1.elb.amazonaws.com' later change to or host API.fisayofasuyi.tech
push the images


ADD HEALTH CHECKS FOR THE FRONTEND SERVICE
in the container part under task definitions, add a cmd part that curls localhost on port 3000 i.e 
healthCheck: {
"command": [
"CMD-SHELL", 
"curl -f http://localhost:3000"
]
}


added port 3000 to inbound rules for the application service  security group cruddur-srv-sg, so that the application can see the load balancer
for the frontend and add the security group id to the source column
also, note

register the frontend and backedn service endpoint via the load balancer on a domain
the frontend points to cruddur.domainname
The backend points to app.domain name



EDIT THE RULES FOR THE LOAD BALANCER TARGET GROUPS
edit the target groups in the load balancer to forward request on port 80 to 3000, this ensures that we do not have to 
add the port when typing the website i.e website:port
so loadbalancer target group edit listener details from 80 redirect to 3000, 443 if we were using https
we forward traffic from our ports to the target groups
80 forwards to 8080, 8080 forwards to backend-flask
insert a rule in the target group to forward traffic from 'api.domainname' to the backend app
adjust the task definition for the backend flask and use the the domain names for the frontend and backend urls
rebuild the images


ammend the authorization token to ensure taht it does not time out when logged in but rather refreshes and generates a new token.

