import {
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetSelection,
} from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

/**
 * LoadBalancer construct props.
 */
export interface LoadBalancerProps {
  /**
   * Sources that will have access to Load Balancer.
   *
   * @default []
   */
  readonly ingressIpv4Source?: string[];

  /**
   * Whether this is an internet-facing Load Balancer.
   *
   * @default false
   */
  readonly internetFacing?: boolean;

  /**
   * The name of the Load Balancer.
   */
  readonly loadBalancerName: string;

  /**
   * The subnets of the Load Balancer.
   */
  readonly subnets: SubnetSelection;

  /**
   * The VPC of the Load Balancer.
   */
  readonly vpc: IVpc;
}

/**
 * Component to create an Application Load Balancer.
 */
export class LoadBalancer extends Construct {
  /**
   * The Load Balancer to create.
   */
  public readonly applicationLoadBalancer: ApplicationLoadBalancer;

  /**
   * The security group of the load balancer.
   */
  public readonly securityGroup: SecurityGroup;

  /**
   * Creates a new instance of class LoadBalancer.
   *
   * @param {Construct} scope The construct within which this construct is defined.
   * @param {string} id Identifier to be used in AWS CloudFormation.
   * @param {LoadBalancerProps} [props={}] Parameters of the class LoadBalancer.
   * @see {@link https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_init|AWS CDK Constructs}
   */
  constructor(scope: Construct, id: string, props: LoadBalancerProps) {
    super(scope, id);

    this.securityGroup = new SecurityGroup(
      this,
      `SecurityGroupLoadBalancer${props.loadBalancerName}`,
      { vpc: props.vpc }
    );

    if (props.ingressIpv4Source) {
      const { ingressIpv4Source } = props;

      if (ingressIpv4Source.length > 0) {
        ingressIpv4Source.forEach((ipAddress) => {
          this.securityGroup.addIngressRule(
            Peer.ipv4(ipAddress),
            Port.tcp(80),
            'Allow access via HTTP.'
          );

          this.securityGroup.addIngressRule(
            Peer.ipv4(ipAddress),
            Port.tcp(443),
            'Allow access via HTTPS.'
          );
        });
      }
    }

    this.applicationLoadBalancer = new ApplicationLoadBalancer(
      this,
      `LoadBalancer${props.loadBalancerName}`,
      {
        loadBalancerName: props.loadBalancerName,
        vpc: props.vpc,
        internetFacing:
          typeof props.internetFacing === 'boolean'
            ? props.internetFacing
            : false,
        securityGroup: this.securityGroup,
        vpcSubnets: props.subnets,
      }
    );
  }
}
