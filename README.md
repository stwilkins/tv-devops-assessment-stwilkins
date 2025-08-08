# Turbovets - DevOps Assessment Project
### Written by: stwilkins

![GitHub CI/CD](https://github.com/stwilkins/tv-devops-assessment-stwilkins/actions/workflows/ci_deploy.yml/badge.svg)

This project represents the work completed by Scott Wilkins as a solution to the DevOps assessment task provided by Turbovets.
The assessment involved creating a Github Workflow pipeline to deploy a web application using Docker for containerization, CDK for Terraform for IAC, and AWS for hosting.

## Project Structure
The project is structured as follows:

### - app/

- This directory contains the source code for the web application, which is built using Node.js and Express.
- See the README.md in the `app/` directory for more details on running the application locally and using Docker.

### - iac/
- This directory contains the infrastructure as code (IAC) configuration using CDK for Terraform (CDKTF).
- See the README.md in the `iac/` directory for more details on the IAC setup and the current status of the project.
- The IAC is not fully functional due to untested configuration, secrets, and pathing issues. The project was built using WSL2 Ubuntu, but encountered issues with Node.js installation which prevented further progress.

### - .github/workflows/
- This directory contains the GitHub Actions workflow configuration for CI/CD.
- The workflow is intended to build, test, and deploy the application to AWS.
- The pipeline is currently successful in building and testing the source code, but fails to deploy due to the incomplete CDKTF configuration and missing variables/secrets.

## Other Details
- The projected time to complete the project was about 8 hours. I spent a little over 20 hours one the project to get it to the point it is at now.
- The project is not fully functional due to the issues mentioned above, but it serves as a foundation for further development.
- With more time, the missing configuration can be populated and tested to hopefully achieve a fully functional deployment pipeline.

