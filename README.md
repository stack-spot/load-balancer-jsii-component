# load-balancer-env-jsii-component

Component to create a Load Balancer.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package OrangeStack.Components.Env.LoadBalancer
```

```csharp
using Amazon.CDK;
using Amazon.CDK.AWS.EC2;
using Constructs;
using OrangeStack.Components.Env.LoadBalancer;

namespace MyStack
{
    public class MyStack : Stack
    {
        internal MyStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            LoadBalancerEnvComponent environment = new LoadBalancerEnvComponent(this, "MyALB", new LoadBalancerEnvComponentProps{
                LoadBalancerName = "xxxxxx",
                Subnets = "xxxxxx",
                Vpc = "xxxxxxx"
            });
        }
    }
}
```

### F#

Not yet supported.

### Go

Not yet supported.

### Java

Not yet supported.

### JavaScript

Install the dependency:

```sh
npm install --save @orange-stack/load-balancer-env-component
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { LoadBalancerEnvComponent } = require('@orange-stack/load-balancer-env-component');

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const loadBalancer = new LoadBalancerEnvComponent(this, 'MyALB', { 
      loadBalancerName: 'xxxxxxx',
      subnets: vpcEnvComponent.subnets,
      vpc: vpcEnvComponent.vpc
     });
  }
}

module.exports = { MyStack }
```

### Python

Not yet supported.

### TypeScript

Install the dependency:

```sh
npm install --save @orange-stack/load-balancer-env-component
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LoadBalancerEnvComponent } from '@orange-stack/load-balancer-env-component';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const loadBalancer = new LoadBalancerEnvComponent(this, 'MyALB', { 
      loadBalancerName: 'xxxxxxxxxx',
      subnets: vpcEnvComponent.subnets,
      vpc: vpcEnvComponent.vpc
     });
  }
}
```

## Construct Props

| Name                 | Type                                        | Description                                                                            |
| -------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| loadBalancerName          | string                                      | The name for the load balancer. Default: DefaultEnvComponentLoadBalancer.                       |
| ingressIpv4Source    | string[]                                    | Sources that will have access to Load Balancer. Default: [].                           |
| internetFacing       | boolean                                     | Whether the load balancer has an internet-routable address. Default: false.            |
| subnets              | [SubnetSelection][aws-cdk-subnet-selection] | The subnets to be used.                                                                |
| vpc                  | [IVpc][aws-cdk-ivpc]                        | The VPC to be used.                                                                    |

## Properties

| Name                | Type                                                         | Description                               |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| loadBalancer        | [ApplicationLoadBalancer][aws-cdk-application-load-balancer] | Application Load Balancer of the cluster. |
| securityGroup       | [SecurityGroup][aws-cdk-security-group]                      | Security group of the load balancer.      |

## Development

### Prerequisites

- [EditorConfig][editorconfig] (Optional)
- [Git][git]
- [Node.js 16][nodejs]

### Setup

```sh
cd load-balancer-env-jsii-component
npm install
```

You are done! Happy coding!

[aws-cdk-application-load-balancer]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer.html
[aws-cdk-security-group]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SecurityGroup.html
[aws-cdk-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[nodejs]: https://nodejs.org/en/download/
