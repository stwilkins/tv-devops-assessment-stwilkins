import { Construct } from 'constructs';
import { ecsCluster, ecsService, ecsTaskDefinition } from '@cdktf/provider-aws';
import { vpc, subnet, securityGroup } from '@cdktf/provider-aws';
import { iamRole } from '@cdktf/provider-aws';

export interface ECSProps {
  environment: string;
  serviceName: string;
  containerPort: number;
  containerImage: string;
  cpu: string;
  memory: string;
  desiredCount: number;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  executionRoleArn: string;
}

export class ECS extends Construct {
  public readonly cluster: ecsCluster.EcsCluster;
  public readonly service: ecsService.EcsService;
  public readonly taskDefinition: ecsTaskDefinition.EcsTaskDefinition;

  constructor(scope: Construct, name: string, props: ECSProps) {
    super(scope, name);

    // Create ECS Cluster
    this.cluster = new ecsCluster.EcsCluster(this, 'cluster', {
      name: `${props.serviceName}-cluster-${props.environment}`,
      tags: {
        Environment: props.environment
      }
    });

    // Create Task Definition
    this.taskDefinition = new ecsTaskDefinition.EcsTaskDefinition(this, 'task-definition', {
      family: `${props.serviceName}-task-${props.environment}`,
      requiresCompatibilities: ['FARGATE'],
      networkMode: 'awsvpc',
      cpu: props.cpu,
      memory: props.memory,
      executionRoleArn: props.executionRoleArn,
      containerDefinitions: JSON.stringify([
        {
          name: props.serviceName,
          image: props.containerImage,
          portMappings: [
            {
              containerPort: props.containerPort,
              protocol: 'tcp'
            }
          ],
          environment: [
            {
              name: 'NODE_ENV',
              value: props.environment
            }
          ],
          logConfiguration: {
            logDriver: 'awslogs',
            options: {
              'awslogs-group': `/ecs/${props.serviceName}`,
              'awslogs-region': 'us-east-1',
              'awslogs-stream-prefix': 'ecs'
            }
          }
        }
      ])
    });

    // Create ECS Service
    this.service = new ecsService.EcsService(this, 'service', {
      name: `${props.serviceName}-service-${props.environment}`,
      cluster: this.cluster.id,
      taskDefinition: this.taskDefinition.arn,
      desiredCount: props.desiredCount,
      launchType: 'FARGATE',
      networkConfiguration: {
        subnets: props.subnetIds,
        securityGroups: props.securityGroupIds,
        assignPublicIp: true
      },
      tags: {
        Environment: props.environment
      }
    });
  }
}