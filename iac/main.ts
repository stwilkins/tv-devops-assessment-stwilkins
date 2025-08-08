// main.ts, which pulled information from lib/config.ts and constructs/
// Setup app and provider, AWS
import { App, TerraformStack } from "cdktf";
import { Provider } from "@cdktf/provider-aws";

// Setup environment variables with config.ts from lib
import { extractVariables } from "./lib/config"

// Setup constructors, how to pull info from AWS
import { Construct } from "constructs";
import { ECS } from "./constructs/ecs"
import { ECR } from "./constructs/ecr"
import { IAM } from "./constructs/iam"
import { NETWORK } from "./constructs/network"


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
  }
}

const app = new App();
new MyStack(app, "iac");
app.synth();
