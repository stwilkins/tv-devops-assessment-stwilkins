// ecr.ts manages Typescript code for the ECR construct

// Imports for constructor and CDKTF
import { Contruct } from 'constructs';
import { EcrRepository } from '@cdktf/provider-aws/lib/ecr';

// Create a properties section
interface properties_ecr {
    repositoryName: string;
}
// Create ECR class
export class ECR extends Construct {
    constructor(scope: ConstructorParameters, id: string, props: properties_ecr) {
        super(scope, id);

        new EcrRepository(this, "EcrRepository", {
            name: props.repositoryName,
        })
    })
}