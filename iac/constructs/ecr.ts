import { EcrRepository } from '@cdktf/provider-aws/lib/ecr-repository';
import { Construct } from 'constructs';

interface ECRProps {
  repositoryName: string;
}

export class ECR extends Construct {
  public readonly repository: EcrRepository;

  constructor(scope: Construct, name: string, props: ECRProps) {
    super(scope, name);

    this.repository = new EcrRepository(this, 'ecr-repo', {
      name: props.repositoryName,
      imageTagMutability: 'MUTABLE',
      tags: {
        Name: props.repositoryName,
        Environment: 'dev'
      }
    });
  }
}