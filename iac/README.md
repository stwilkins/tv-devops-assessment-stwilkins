# Status

The IAC as it stands is not fully functional due to untested configuration, secrets, and pathing issues.

- The project was built using WSL2 Ubuntu, however my WSL could not install NODEJS. The error preventing the installation is listed here:
  - `Error: curl: (56) OpenSSL SSL_read: OpenSSL/3.0.13: error:0A000119:SSL routines::decryption failed or bad record mac, errno 0`
- With most of my tooling already established in the WSL2 Ubuntu environment, and my lack of knowledge regarding the differences between it and Windows, I was not able to resolve the issue in time for the assessment deadline.
- Here is what the path forward for the IAC was, barring the issue above:
```
    - Estanblish list of variables/secrets needed for the CDKTF configuration
    - Populate the variables/secrets in the GitHub repository and AWS Secrets Manager
    - Create an environmental config template for users to edit, NOT hardcode the variables/secrets in the code
        Either .env or the cdktf.json file
    - Finish typescript constructs for ECS, ECR, IAM, and NETWORK (which covers VPC, Subnets, and Security Groups)
    - Update main.ts to include the constructs and deploy the application
    - Test the CDKTF configuration by running `npx cdktf deploy`
    - If successful, update the GitHub workflow to include the correct CDKTF deploy step
```

Optimisitcally this would have been the completion of the project.

# Testing on another computer

- Testing my code on another linux based computer likely would resolve the NODEJS installation issue, then promptly be stopped by the incomplete CDKTF configuration.

