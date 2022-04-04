# Load Balancer

[![aws-cdk][badge-aws-cdk]][aws-cdk]
[![jsii][badge-jsii]][jsii]
[![npm-version][badge-npm-version]][npm-package]
[![nuget-version][badge-nuget-version]][nuget-package]
[![npm-downloads][badge-npm-downloads]][npm-package]
[![nuget-downloads][badge-nuget-downloads]][nuget-package]
[![license][badge-license]][license]

Component to create an Application Load Balancer.

## How to use

Below are all languages supported by the AWS CDK.

### C#

Install the dependency:

```sh
dotnet add package StackSpot.Cdk.LoadBalancer
```

```csharp
using Amazon.CDK;
using Amazon.CDK.AWS.EC2;
using Constructs;
using StackSpot.Cdk.LoadBalancer;

namespace MyStack
{
    public class MyStack : Stack
    {
        internal MyStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {
            Vpc vpc = new Vpc(this, "MyVpc");

            LoadBalancer loadBalancer = new LoadBalancer(this, "MyLoadBalancer", new LoadBalancerProps {
                LoadBalancerName = "MyLoabBalancer",
                Subnets = new SubnetSelection {
                    SubnetType = SubnetType.PUBLIC
                },
                Vpc = vpc
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
npm install --save @stackspot/cdk-load-balancer
```

Import the construct into your project, for example:

```javascript
const { Stack } = require('aws-cdk-lib');
const { SubnetType, Vpc } = require('aws-cdk-lib/aws-ec2');
const { LoadBalancer } = require('@stackspot/cdk-load-balancer');

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc');

    const loadBalancer = new LoadBalancerEnvComponent(this, 'MyALB', {
      loadBalancerName: 'MyLoadBalancer',
      subnets: vpc.selectSubnets({ subnetType: SubnetType.PUBLIC }),
      vpc,
    });
  }
}

module.exports = { MyStack };
```

### Python

Not yet supported.

### TypeScript

Install the dependency:

```sh
npm install --save @stackspot/cdk-load-balancer
```

Import the construct into your project, for example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { LoadBalancer } from '@stackspot/cdk-load-balancer';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc');

    const loadBalancer = new LoadBalancer(this, 'MyLoadBalancer', {
      loadBalancerName: 'MyLoadBalancer',
      subnets: vpc.selectSubnets({ subnetType: SubnetType.PUBLIC }),
      vpc,
    });
  }
}
```

## Construct Props

| Name               | Type                                            | Description                                                       |
| ------------------ | ----------------------------------------------- | ----------------------------------------------------------------- |
| ingressIpv4Source? | string[]                                        | Sources that will have access to Load Balancer. Default: [].      |
| internetFacing?    | boolean                                         | Whether this is an internet-facing Load Balancer. Default: false. |
| loadBalancerName   | string                                          | The name of the Load Balancer.                                    |
| subnets            | [SubnetSelection][aws-cdk-ec2-subnet-selection] | The subnets of the Load Balancer.                                 |
| vpc                | [IVpc][aws-cdk-ec2-ivpc]                        | The VPC of the Load Balancer.                                     |

## Properties

| Name                    | Type                                                             | Description                              |
| ----------------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| applicationLoadBalancer | [ApplicationLoadBalancer][aws-cdk-elb-application-load-balancer] | The Load Balancer to create.             |
| securityGroup           | [SecurityGroup][aws-cdk-ec2-security-group]                      | The security group of the load balancer. |

## IAM Least privilege

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AuthorizeSecurityGroupEgress",
        "ec2:CreateSecurityGroup",
        "ec2:DeleteSecurityGroup",
        "ec2:DescribeSecurityGroups",
        "ec2:RevokeSecurityGroupEgress",
        "elasticloadbalancing:CreateLoadBalancer",
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:ModifyLoadBalancerAttributes",
        "ssm:GetParameters"
      ],
      "Resource": "*"
    }
  ]
}
```

## Development

### Prerequisites

- [EditorConfig][editorconfig] (Optional)
- [Git][git]
- [Node.js][nodejs] 17

### Setup

```sh
cd load-balancer-jsii-component
npm install
```

[aws-cdk]: https://aws.amazon.com/cdk
[aws-cdk-ec2-ivpc]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html
[aws-cdk-ec2-security-group]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SecurityGroup.html
[aws-cdk-ec2-subnet-selection]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SubnetSelection.html
[aws-cdk-elb-application-load-balancer]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer.html
[badge-aws-cdk]: https://img.shields.io/github/package-json/dependency-version/stack-spot/load-balancer-jsii-component/dev/aws-cdk-lib
[badge-jsii]: https://img.shields.io/github/package-json/dependency-version/stack-spot/load-balancer-jsii-component/dev/jsii
[badge-license]: https://img.shields.io/github/license/stack-spot/load-balancer-jsii-component
[badge-npm-downloads]: https://img.shields.io/npm/dt/@stackspot/cdk-load-balancer?label=downloads%20%28npm%29
[badge-npm-version]: https://img.shields.io/npm/v/@stackspot/cdk-load-balancer
[badge-nuget-downloads]: https://img.shields.io/nuget/dt/StackSpot.Cdk.LoadBalancer?label=downloads%20%28NuGet%29
[badge-nuget-version]: https://img.shields.io/nuget/vpre/StackSpot.Cdk.LoadBalancer
[editorconfig]: https://editorconfig.org/
[git]: https://git-scm.com/downloads
[jsii]: https://aws.github.io/jsii/
[license]: https://github.com/stack-spot/load-balancer-jsii-component/blob/main/LICENSE
[nodejs]: https://nodejs.org/en/download/
[npm-package]: https://www.npmjs.com/package/@stackspot/cdk-load-balancer
[nuget-package]: https://www.nuget.org/packages/StackSpot.Cdk.LoadBalancer
