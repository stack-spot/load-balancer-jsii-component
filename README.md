# load-balancer-env-jsii-component

[![aws-cdk][badge-aws-cdk]][aws-cdk]
[![jsii][badge-jsii]][jsii]
[![npm-version][badge-npm-version]][npm-package]
[![nuget-version][badge-nuget-version]][nuget-package]
[![npm-downloads][badge-npm-downloads]][npm-package]
[![nuget-downloads][badge-nuget-downloads]][nuget-package]
[![license][badge-license]][license]

Component to create a Load Balancer.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package StackSpot.Env.LoadBalancer
```

```csharp
using Amazon.CDK;
using Amazon.CDK.AWS.EC2;
using Constructs;
using StackSpot.Env.LoadBalancer;

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
npm install --save @stackspot/cdk-env-load-balancer
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { LoadBalancerEnvComponent } = require('@stackspot/cdk-env-load-balancer');

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
npm install --save @stackspot/cdk-env-load-balancer
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LoadBalancerEnvComponent } from '@stackspot/cdk-env-load-balancer';

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

## IAM Least privilege

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudformation:Describe*",
                "cloudformation:List*",
                "cloudformation:Get*"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::cdktoolkit-stagingbucket-*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "ssm:GetParameters"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Effect": "Allow",
            "Action": [
              "ec2:DescribeSecurityGroups",
              "ec2:CreateSecurityGroup",
              "ec2:RevokeSecurityGroupEgress",
              "ec2:DeleteSecurityGroup",
              "ec2:AuthorizeSecurityGroupEgress",
              "elasticloadbalancing:Describe*",
              "elasticloadbalancing:CreateLoadBalancer",
              "elasticloadbalancing:ModifyLoadBalancerAttributes"
            ],
            "Resource": "*"
        }
    ]
}
```

Usage:

```sh
cdk bootstrap \
  --public-access-block-configuration false \
  --trust <account-id> \
  --cloudformation-execution-policies arn:aws:iam::<account-id>:policy/<policy-name> \
  aws://<account-id>/<region>

cdk deploy
```

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

[aws-cdk]: https://aws.amazon.com/cdk
[aws-cdk-application-load-balancer]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer.html
[aws-cdk-security-group]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SecurityGroup.html
[aws-cdk-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[badge-aws-cdk]: https://img.shields.io/github/package-json/dependency-version/stack-spot/load-balancer-env-jsii-component/aws-cdk-lib
[badge-jsii]: https://img.shields.io/github/package-json/dependency-version/stack-spot/load-balancer-env-jsii-component/dev/jsii
[badge-license]: https://img.shields.io/github/license/stack-spot/load-balancer-env-jsii-component
[badge-npm-downloads]: https://img.shields.io/npm/dt/@stackspot/cdk-env-load-balancer?label=downloads%20%28npm%29
[badge-npm-version]: https://img.shields.io/npm/v/@stackspot/cdk-env-load-balancer
[badge-nuget-downloads]: https://img.shields.io/nuget/dt/StackSpot.Env.LoadBalancer?label=downloads%20%28NuGet%29
[badge-nuget-version]: https://img.shields.io/nuget/vpre/StackSpot.Env.LoadBalancer
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[jsii]: https://aws.github.io/jsii/
[license]: https://github.com/stack-spot/load-balancer-env-jsii-component/blob/main/LICENSE
[nodejs]: https://nodejs.org/en/download/
[npm-package]: https://www.npmjs.com/package/@stackspot/cdk-env-load-balancer
[nuget-package]: https://www.nuget.org/packages/StackSpot.Env.LoadBalancer
