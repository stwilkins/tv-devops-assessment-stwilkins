# Status

The IAC as it stands is not fully functional due to untested configuration, secrets, and pathing issues.

- The project was built using several environments, including Git Bash, VSCode on Windows, and WSL2 Ubuntu.
  - At the time I was unaware of the issues caused by pathing and installations when using different environments
  - When encountering prroblems with synthesizing, I decided to move to WSL2 Ubuntu and start fresh
  - However my WSL can not install NODEJS for some reason, effectively leaving me stranded. The error preventing the installation is listed here:
  - `Error: curl: (56) OpenSSL SSL_read: OpenSSL/3.0.13: error:0A000119:SSL routines::decryption failed or bad record mac, errno 0`
- With most of my tooling not established, the problem persisting, and my lack of knowledge regarding the differences, I was not able to resolve the issue in time for the assessment deadline.
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

- Testing my code on another linux based OS with NODEJS installed likely will reveal what my next tasks would have been. I did not however have the means of acquiring one, given my circumstances.

