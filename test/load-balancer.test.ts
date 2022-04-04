import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { LoadBalancer } from '../lib/index';

describe('LoadBalancer', () => {
  test('has applicationLoadBalancer property', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    const loadBalancer = new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });

    expect(loadBalancer.applicationLoadBalancer).toBeInstanceOf(
      ApplicationLoadBalancer
    );
  });

  test('has securityGroup property', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    const loadBalancer = new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });

    expect(loadBalancer.securityGroup).toBeInstanceOf(SecurityGroup);
  });

  test('creates load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResource('AWS::ElasticLoadBalancingV2::LoadBalancer', {});
    template.resourceCountIs('AWS::ElasticLoadBalancingV2::LoadBalancer', 1);
  });

  test('has internet facing disabled by default', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties(
      'AWS::ElasticLoadBalancingV2::LoadBalancer',
      { Scheme: 'internal' }
    );
  });

  test('has the option to enable internet facing on load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      internetFacing: true,
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties(
      'AWS::ElasticLoadBalancingV2::LoadBalancer',
      { Scheme: 'internet-facing' }
    );
  });

  test('has the option to disable internet facing on load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      internetFacing: false,
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties(
      'AWS::ElasticLoadBalancingV2::LoadBalancer',
      { Scheme: 'internal' }
    );
  });

  test('creates security group', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResource('AWS::EC2::SecurityGroup', {});
    template.resourceCountIs('AWS::EC2::SecurityGroup', 1);
  });

  test('reuses the VPC in the security group', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    const securityGroup = template.findResources('AWS::EC2::SecurityGroup');
    const securityGroupName = Object.keys(securityGroup)[0];
    const securityGroupVpcId =
      securityGroup[securityGroupName].Properties.VpcId.Ref;

    const vpcId = Object.keys(template.findResources('AWS::EC2::VPC'))[0];

    expect(securityGroupVpcId).toBe(vpcId);
  });

  test('has the option to add ingress IPv4 source', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      ingressIpv4Source: ['100.100.0.0/16', '200.200.0.0/16'],
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
      SecurityGroupIngress: [
        {
          CidrIp: '100.100.0.0/16',
          Description: 'Allow access via HTTP.',
          FromPort: 80,
          IpProtocol: 'tcp',
          ToPort: 80,
        },
        {
          CidrIp: '100.100.0.0/16',
          Description: 'Allow access via HTTPS.',
          FromPort: 443,
          IpProtocol: 'tcp',
          ToPort: 443,
        },
        {
          CidrIp: '200.200.0.0/16',
          Description: 'Allow access via HTTP.',
          FromPort: 80,
          IpProtocol: 'tcp',
          ToPort: 80,
        },
        {
          CidrIp: '200.200.0.0/16',
          Description: 'Allow access via HTTPS.',
          FromPort: 443,
          IpProtocol: 'tcp',
          ToPort: 443,
        },
      ],
    });
  });

  test('adds the security group to the load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnets = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      loadBalancerName: 'TestLoadBalancer',
      subnets,
      vpc,
    });
    const template = Template.fromStack(stack);

    const loadBalancer = template.findResources(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    );
    const loadBalancerName = Object.keys(loadBalancer)[0];
    const loadBalancerSecurityGroupId =
      loadBalancer[loadBalancerName].Properties.SecurityGroups[0][
        'Fn::GetAtt'
      ][0];

    const securityGroup = template.findResources('AWS::EC2::SecurityGroup');
    const securityGroupId = Object.keys(securityGroup)[0];

    expect(loadBalancerSecurityGroupId).toBe(securityGroupId);
  });

  test('uses public subnets in the load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnetsVpc = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PUBLIC,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      internetFacing: true,
      loadBalancerName: 'TestLoadBalancer',
      subnets: subnetsVpc,
      vpc,
    });
    const template = Template.fromStack(stack);

    const loadBalancer = template.findResources(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    );
    const loadBalancerName = Object.keys(loadBalancer)[0];
    const loadBalancerSubnetsRef =
      loadBalancer[loadBalancerName].Properties.Subnets;
    const loadBalancerSubnets: string[] = [];
    loadBalancerSubnetsRef.forEach((subnet: any) => {
      if ('Ref' in subnet) {
        loadBalancerSubnets.push(subnet.Ref);
      }
    });
    loadBalancerSubnets.sort();

    const subnetsRef = template.findResources('AWS::EC2::Subnet');
    const subnetsName = Object.keys(template.findResources('AWS::EC2::Subnet'));
    const subnets: string[] = [];
    subnetsName.forEach((subnetName: string) => {
      if (subnetsRef[subnetName].Properties.MapPublicIpOnLaunch) {
        subnets.push(subnetName);
      }
    });
    subnets.sort();

    expect(loadBalancerSubnets).toStrictEqual(subnets);
  });

  test('uses private subnets in the load balancer', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const vpc = new Vpc(stack, 'TestVpc');
    const subnetsVpc = vpc.selectSubnets({
      onePerAz: true,
      subnetType: SubnetType.PRIVATE_WITH_NAT,
    });
    new LoadBalancer(stack, 'TestConstruct', {
      internetFacing: false,
      loadBalancerName: 'TestLoadBalancer',
      subnets: subnetsVpc,
      vpc,
    });
    const template = Template.fromStack(stack);

    const loadBalancer = template.findResources(
      'AWS::ElasticLoadBalancingV2::LoadBalancer'
    );
    const loadBalancerName = Object.keys(loadBalancer)[0];
    const loadBalancerSubnetsRef =
      loadBalancer[loadBalancerName].Properties.Subnets;
    const loadBalancerSubnets: string[] = [];
    loadBalancerSubnetsRef.forEach((subnet: any) => {
      if ('Ref' in subnet) {
        loadBalancerSubnets.push(subnet.Ref);
      }
    });
    loadBalancerSubnets.sort();

    const subnetsRef = template.findResources('AWS::EC2::Subnet');
    const subnetsName = Object.keys(template.findResources('AWS::EC2::Subnet'));
    const subnets: string[] = [];
    subnetsName.forEach((subnetName: string) => {
      if (subnetsRef[subnetName].Properties.MapPublicIpOnLaunch === false) {
        subnets.push(subnetName);
      }
    });
    subnets.sort();

    expect(loadBalancerSubnets).toStrictEqual(subnets);
  });
});
