
# Prerequisites
To run the run the application locally, you will need the following prerequisites:
- Node.js (version 20.0.0)
  - <sub>(I suggest the user use version 20.0.0 because I experienced build failure for @cdktf/node-pty-prebuilt-multiarch when working on CDKTF, but it may not matter for you)</sub>

- Docker and Docker-Compose

# Local Dev Instructions
To run the application locally, follow these steps:
```
> cd app/
> npm ci
> npx tsc --build --clean
> npx tsc
> node dist/server.js
```

Once the server is running, you can access the application at `http://localhost:3000`. You can also see the healthcheck by navigating to `http://localhost:3000/health`.

# Docker Instructions

To run the application locally using Docker, follow these steps:

```
> cd app/
> docker build -t express-app .  # This builds the Docker image
> docker run -p 3000:3000 express-app  # This runs the Docker container
```
Once the server is running, you can access the application at `http://localhost:3000`. You can also see the healthcheck by navigating to `http://localhost:3000/health`.

To utilize the docker-compose.yml, run:
```
> docker-compose up --build
```

# Github Workflow information
Github workflows are linked to this project via `.github/workflows/ci_deploy.yml`. This file contains the CI/CD pipeline that builds, tests, and deploys the application to AWS. (Or at least it attempts to.)

The pipeline is currently triggered from pushes to any branch for testing. Upon success of the pipeline testing, the YAML would be configured to only trigger on pushes to the main branch, or on pull requests to the main branch.

### Pipeline Status
The pipeline is successful in the build-test for the source code, but fails to deploy the application to AWS due to an incomplete CDKTF configuration and list of variables/secrets.

See the [README.md](https://github.com/stwilkins/tv-devops-assessment-stwilkins/tree/devops_assessment_dev/iac) from the iac/ directory for more information on the CDKTF configuration.

See the repo's Actions tab for the latest run of the pipeline.

This isn't a road block in the code, merely a limitation of the developer's time and experience with CDKTF. With more time, the missing configuration can be populated and tested.

