import { Construct } from 'constructs';
import { vpc, subnet, securityGroup, securityGroupRule } from '@cdktf/provider-aws';

export interface NetworkProps {
  vpcName: string;
  vpcCidr: string;
  environment: string;
  subnetCidrs: string[];
  availabilityZones: string[];
}

export class Network extends Construct {
  public readonly vpc: vpc.Vpc;
  public readonly subnet: subnet.Subnet[];
  public readonly ecsSecurityGroup: securityGroup.SecurityGroup;

  constructor(scope: Construct, name: string, props: NetworkProps) {
    super(scope, name);

    // Create VPC
    this.vpc = new vpc.Vpc(this, 'main', {
      cidrBlock: props.vpcCidr,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: {
        Name: props.vpcName,
        Environment: props.environment
      }
    });

    // Create Subnets
    this.subnet = props.subnetCidrs.map((cidr, index) => {
      return new subnet.Subnet(this, `subnet-${index + 1}`, {
        vpcId: this.vpc.id,
        cidrBlock: cidr,
        availabilityZone: props.availabilityZones[index],
        tags: {
          Name: `${props.vpcName}-subnet-${index + 1}`,
          Environment: props.environment
        }
      });
    });

    // SG for ECS
    this.ecsSecurityGroup = new securityGroup.SecurityGroup(this, 'app-sg', {
      name: `${props.vpcName}-app-sg`,
      description: 'Security group for application',
      vpcId: this.vpc.id,
      tags: {
        Name: `${props.vpcName}-app-sg`,
        Environment: props.environment
      }
    });

    // HTTP
    new securityGroupRule.SecurityGroupRule(this, 'app-sg-rule-http', {
      type: 'ingress',
      fromPort: 80,
      toPort: 80,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
      securityGroupId: this.ecsSecurityGroup.id
    });

    // HTTPS
    new securityGroupRule.SecurityGroupRule(this, 'app-sg-rule-https', {
      type: 'ingress',
      fromPort: 443,
      toPort: 443,
      protocol: 'tcp',
      cidrBlocks: ['0.0.0.0/0'],
      securityGroupId: this.ecsSecurityGroup.id
    });
  }
}