import {
  ApplicationLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import {
  IVpc,
  SecurityGroup,
  SubnetSelection,
  Peer,
  Port,
} from 'aws-cdk-lib/aws-ec2';

export interface LoadBalancerEnvComponentProps {
  /**
   * Load Balancer name
   *
   * @default DefaultEnvComponentLoadBalancer
   */
   readonly loadBalancerName?: string;
  /**
   * Load Balancer scheme Internal or Internet facing
   *
   * @default false
   */
  readonly internetFacing?: boolean

  /**
   * Sources that will have access to Load Balancer.
   *
   * @default []
   */
  readonly ingressIpv4Source?: string[];

  /**
   * Subnets used by ALB
   *
   */
  readonly subnets: SubnetSelection;

  /**
    * VPC used on the environment.
    */
  readonly vpc: IVpc;

}

export class LoadBalancerEnvComponent extends Construct {
  /**
   * LoadbalancerEnvComponent creates an Application Load Balancer to use in some environment.
   */
  public readonly loadBalancer: ApplicationLoadBalancer;

  /**
   * Security group of the load balancer.
   */
  public readonly securityGroup: SecurityGroup;

  constructor(scope: Construct, id: string, props: LoadBalancerEnvComponentProps) {
    super(scope, id);
    this.securityGroup = new SecurityGroup(
      this,
      'LoadBalancerEnvComponentSecurityGroup',
      { vpc: props.vpc },
    );

    if (props.ingressIpv4Source) {
      const { ingressIpv4Source } = props;
      if (ingressIpv4Source.length > 0) {
        ingressIpv4Source.forEach((ipAddress) => {
          this.securityGroup.addIngressRule(
            Peer.ipv4(ipAddress),
            Port.tcp(80),
            'Allow access via HTTP.',
          );

          this.securityGroup.addIngressRule(
            Peer.ipv4(ipAddress),
            Port.tcp(443),
            'Allow access via HTTPS.',
          );
        });
      }
    }
    this.loadBalancer = new ApplicationLoadBalancer(
      this,
      'DefaultEnvComponentLoadBalancer',
      {
        loadBalancerName: props.loadBalancerName || 'DefaultEnvComponentLoadBalancer',
        vpc: props.vpc,
        internetFacing: props.internetFacing || false,
        securityGroup: this.securityGroup,
        vpcSubnets: props.subnets,

      },
    );
  }
}
