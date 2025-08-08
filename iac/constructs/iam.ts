import { Construct } from 'constructs';
import { iamRole, iamRolePolicyAttachment } from '@cdktf/provider-aws';

export interface IAMProps {
  roleName: string;
}

export class IAM extends Construct {
  public readonly executionRole: iamRole.IamRole;

  constructor(scope: Construct, name: string, props: IAMProps) {
    super(scope, name);

    this.executionRole = new iamRole.IamRole(this, 'execution-role', {
      name: props.roleName,
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'ecs-tasks.amazonaws.com'
          }
        }]
      })
    });

    new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'execution-policy-attachment', {
      role: this.executionRole.name,
      policyArn: 'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy'
    });
  }
}