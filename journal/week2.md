# Week 2 — Distributed Tracing
Instrumented Honeycomb for the Cruddur Application
embeded the honeycomb api key and service into the cruddur app
embeded the hotkp endpoints and headers into the docker compose file
imported the python modules into the app.py file
integrated open telemetry into the application using honey comb
observed the data generated from the honeycomb site
created a span to observe api calls and nested api activities
ran queries in honeycomb to view application network status like latency.
I instrumented the frontend-app-js application with honeycomb to test the network latency between the frontend and backend.  
Created a span on the notifications feed page and signup page.
I added custom query to count the duration in milliseconds it took for the frontend to communicate with the backend while adding new notifications.


instrumented aws xray to log events
imported aws xray code to the backend feed and used it to monitor api calls to the backend
added it as a service to docker-compose to run in a separate container
viewed the metrics on aws.


Instrumented aws rollbar logging to the application
installed rollbar with the requirements file
used the rollbar key as an environment variable in the docker compose file and the app.py
added an api endpoint rollbar/test to the application to test 
went over to the rollbar site to look at the logs of the api calls form the application

https://user-images.githubusercontent.com/30091409/224404700-bca12d91-1408-4494-8037-9aa327a131c2.PNG
