// main.ts, which pulled information from lib/config.ts and constructs/

import { App, TerraformStack, S3Backend } from "../app/node_modules/cdktf";
import { Provider } from "@cdktf/provider-aws";
import { CONFIG } from "./lib/config"
import { Construct } from "constructs";
import { ECR } from "./constructs/ecr"  // ECR Repository
import { ECS } from "./constructs/ecs"  // ECS Service Construct
import { IAM } from "./constructs/iam"  // Identity and Access Management
import { NETWORK } from "./constructs/network"  // VPC, Security Groups, and subnets

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Add AWS Provider
    new Provider(this, "AWS", {
      region: "us-east-1",
    });

    // Create network infrastructure
    const network = new NETWORK (this, 'network', {
// TODO: Replace vpcName with variable from config.ts
      vpcName: 'my-app-vpc',
      vpcCidr: '10.0.0.0/16',
      environment: 'dev',
      subnetCidrs: [
        '10.0.1.0/24',
        '10.0.2.0/24',
        '10.0.3.0/24',
        '10.0.4.0/24'
      ],
      availabilityZones: [
        'us-east-1a',
        'us-east-1b'
      ]
    });

    // Add IAM role for ECS tasks
    const iam = new IAM(this, 'iam', {
      roleName: 'ecs-execution-role',
    });

  }
}

const app = new App();
new MyStack(app, "iac");
app.synth();
