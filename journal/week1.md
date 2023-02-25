# Week 1 — App Containerization

App Containerization

For the previous class, we had to run the applications in containers, it is a better way to run applications as you can run the applications on any containers without any issues as the dependencies and packages are already defined.
We then lerant about the use of docker compose to run multiple containers in which all the varoius configurations are stored in a docker compose file.

Ran Initial Docker Compose

I had to run the docker compose file, which exposed the backend and frontend ports, it did not succeed at first but after a few trials, it did. The front end end endpoints did not return any response so i had to stop the containers to install the node modules as they were not installed.

Implementation of Backend  Notification Api

we were asked to implement the front and backend apis for notifications. Running docker compose build on the yaml files brought back an error because the node modeules for the react frontend were not installed. After This was done, i added to the open api a notification service which when implemented would show the notifiaction route. To the app.py, i added a route for notifications ('api/services/notifictions) and to the services directory, i added a notifications file to handle get requests for notifications.

Implementation of Frontend Notification Api

I implemented the frontend notifications, created a notificatins file to handle notifications requests as well as its rresponding css file, the notifications request was also added to the app.js file to make sure the notification requests were handled.


Run A Docker container using industry best practices

Finally, I ran a docker container with security best practices in which, i wscanned the container for securitry vulnerability, limited each application to 1 container monitored the container secutiy using clair and used appropriate tags for docker images
