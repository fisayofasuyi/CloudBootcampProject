# Week 3 — Decentralized Authentication

Task 1 - Decouple the JWT verify from the application code by writing a  Flask Middleware
I Installed Flask-JWT-Extended library using pip, i used the Flask-JWT-Extended library
I Imported and initialize the JWT manager in your Flask app:
I Created a function to generate access tokens
I Created a decorator to protect routes that require authentication
On the client side, in sent the access token to the header of each request


Task 2 - Decouple the JWT verify process by using Envoy as a sidecar
1.I used the Envoys' authentication filter to check the token's signature, expiration time, and other details to ensure that it is valid.
2.Once the token is authenticated, Envoy extracts the information from it and pass it along to the microservice as metadata. 
3.Set up Envoy as a sidecar Tusing a separate docker container 
4.Configured Envoy using Envoy's configuration language to define filters and other settings.
5.start the application with envoy -c envoy-demo.yaml, with the yaml configuration file
6.sent requests the api endpoints to verify that they are able to access the JWT token information from the metadata provided by Envoy.