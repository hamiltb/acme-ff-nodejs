# ACME sample application

A dockerized dummy website server that is used for various CI/CD concepts
This is a Node.JS application that utilizes various features, like Menus, etc.
I have added code that checks for a test boolean FeatureFlag, and changes the Contact list depending on the flag.
It currently requires a application restart when toggling flag, I am looking for a web guru to help me with this.

To build and execute:

*docker build -t acme-ff-nodejs .*

*docker run -it -p 8080:8080 acme-ff-nodejs*

Navigate to: http://localhost:8080/

