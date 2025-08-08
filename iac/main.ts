// main.ts, which pulled information from lib/config.ts and constructs/
// Setup app and provider, AWS
import { App, TerraformStack } from "../app/node_modules/cdktf";
import { Provider } from "@cdktf/provider-aws";

// Setup environment variables with config.ts from lib
import { extractVariables } from "./lib/config"

// Setup constructors, what to pull info from AWS
import { Construct } from "constructs";
import { ECR } from "./constructs/ecr"  // ECR Repository
import { ECS } from "./constructs/ecs"  // ECS Service
import { NETWORK } from "./constructs/network"  // VPC, Security Groups, and subnets
import { IAM } from "./constructs/iam"  // Identity and Access Management

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
  }
}

const app = new App();
new MyStack(app, "iac");
app.synth();
