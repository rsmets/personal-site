---
title: "Yolo CLI vs. My Bespoke Kiro CLI Setup with AWS MCP Tools"
publishDate: 2026-02-15
img:
img_alt:
category: cli
description: |
  A hands-on comparison of the Yolo CLI and my local Kiro-based setup with AWS MCP server tools, using identical prompts to query AWS resources side by side.
tags:
  - AI Development
  - AWS Tooling
  - CLI Tools
  - MCP
---

## Background

I have been running a bespoke local CLI setup built on top of Kiro with AWS MCP server tools for a while now. It lets me query and manage my AWS resources conversationally, leveraging the model of my choice and a curated set of MCP servers. When a colleague pointed me toward [Yolo CLI](https://yolo.dev), a new entrant in the agentic cloud management space, I figured the only fair way to evaluate it was to run identical prompts through both tools and compare the outputs side by side.

## Getting Started with Yolo

The Yolo team appears to be iterating quickly. When I first tried setting it up on a Thursday their OAuth was broken preventing api key creation. Then upon trying again on Friday after the OAuth bug was fixed, I hit an authentication error using temporary STS credentials. After downloading the latest version of the CLI the a couple days later, it worked without issue. At least they are trending in the right direction with their bug fixes!

## The Comparison

I ran a series of progressively detailed prompts through both tools. Here is how they stacked up.

### Prompt 1: "How many EC2 instances do I have running right now?"

![Side-by-side comparison of Yolo CLI and Kiro CLI responding to an EC2 instance count query](/assets/yolo/ec2.png)

Both tools correctly identified 3 running EC2 instances in us-west-2, all c6a.large. The notable difference was in the default verbosity of the response.

Yolo proactively surfaced a rich table with Instance ID, Type, Cluster, AZ, Private IP, and Launch Time without being asked. It also identified them as EKS-managed nodes on a general-purpose node pool. That is a lot of useful context for a single prompt.

My Kiro CLI returned a more minimal table with Instance ID, Type, and State. It noted they were all c6a.large and offered to check other regions, but did not volunteer AZ or cluster information unprompted.

### Prompt 2: Requesting More Detail

Because Yolo had already surfaced AZ information unprompted, my follow-up to Yolo was simply: _"Can you give me more detailed info about these instances?"_ For my Kiro setup, I had to be more specific: _"Can you give me more info about these instances such as the AZ they are in?"_ Yolo's proactive verbosity in the first prompt saved me a round trip here.

![Side-by-side comparison of detailed EC2 instance information from Yolo CLI and Kiro CLI](/assets/yolo/ec2-details.png)

Yolo returned a dense table covering Instance ID, Type, State, VPC, Subnet, Security Group, AMI, Root Volume, EBS Volume size, and Launch Time. It then went further with additional sections on Architecture and Virtualization (x86_64, HVM, Xen hypervisor, UEFI boot mode), Storage (EBS volumes, termination behavior), Networking (ENA, source/destination check, IMDSv2), IAM Roles, and EKS Tags. It was thorough.

My Kiro CLI returned a cleaner table with Instance ID, AZ, Private IP, VPC, Subnet, Launched, and Platform. It also added some useful contextual observations: the first two instances are in the same VPC and subnet (us-west-2b), launched about a minute apart, likely part of the same deployment. The third is in a different VPC entirely (us-west-2a) with a different private IP range. It then offered to dig into security groups, IAM roles, or instance purpose.

The difference in approach is interesting. Yolo dumps everything it can find upfront. Kiro surfaces a curated summary and offers to go deeper on specific areas. Both are valid strategies depending on whether you want breadth or guided exploration.

### Prompt 3: "Can you give me cost information for all my resources?"

This is where things got the most interesting.

![Side-by-side comparison of cost queries in Yolo CLI and Kiro CLI](/assets/yolo/cost-side-by-side.png)

Yolo acknowledged upfront that it does not have access to AWS Cost Explorer or billing data directly, but then proceeded to estimate costs based on the resources it could see. It broke down EC2 instances (3x c6a.large at ~$61.32/month each, ~$165.30 subtotal), EBS Volumes (6 volumes totaling 252 GB of gp3 at ~$20.16/month), and flagged additional costs not shown like EKS Control Plane ($0.10/hour x 2 clusters = ~$146/month), Data Transfer, KMS, and NAT Gateway. It arrived at an estimated total of ~$204/month for visible resources and ~$350-400/month with EKS included. All from a single prompt.

The Yolo output was truncated in the terminal, so here is the full output:

![Full Yolo CLI cost output](/assets/yolo/cost-yolo.png)

My Kiro CLI, on the other hand, tried to call AWS Cost Explorer directly via the `call_aws` MCP tool and got back that Cost Explorer was not enabled on the account. It then offered helpful guidance on how to enable it and provided a rough estimate for just the EC2 compute (~$0.0765/hr each, ~$166/month for all three). Useful, but far less comprehensive than Yolo's resource-by-resource breakdown.

I then realized I had the Cost Explorer MCP server configured in my IDE but not in my CLI. When I ran the same prompt through the IDE, it went on a thorough inventory of the entire account across multiple regions and services:

![Kiro IDE cost breakdown part 1 showing EC2, EKS, NAT Gateways, Load Balancers, OpenSearch, and Kendra](/assets/yolo/cost-ide-1.png)

![Kiro IDE cost breakdown part 2 showing QuickSight, Athena, Lambda, S3, CloudTrail, and total estimate](/assets/yolo/cost-ide-2.png)

The IDE's output was remarkably detailed. It covered EC2, EKS clusters, NAT Gateways (flagging 5 in us-west-2 as a "sneaky cost driver"), Load Balancers, OpenSearch, Kendra (calling out the ~$810/month GenAI Enterprise index as "the elephant in the room"), QuickSight, Athena, Lambda (~35 functions in us-west-2, 4 in us-east-1), S3 (2.18 GB across 20 buckets), and CloudTrail. It arrived at an estimated monthly total of ~$1,400 to $1,500 and even provided a prioritized breakdown of where the money was going. It took noticeably longer than Yolo did, but the depth was impressive once it had the right tools available.

The takeaway: Yolo's prompt tuning made it scrappy and resourceful even without direct billing access. My Kiro setup with the right MCP servers configured produced a more comprehensive result, but required that configuration to be in place first.

### Prompt 4: "Can you tell me what services I have configured in my flowops EKS cluster?"

![Side-by-side comparison of EKS service queries in Yolo CLI and Kiro CLI](/assets/yolo/eks.png)

Both tools correctly identified the cluster and listed the services. Yolo ran `aws eks update-kubeconfig` to set context, then `kubectl get services --all-namespaces -o wide` to pull everything. It organized the output into Application Services (flowops namespace) and System Services, presenting a clean table with Service, Type, Cluster IP, Port, Age, and Purpose for each. It also noted that all application services are internal (ClusterIP) and offered to check for ingress resources or load balancers.

My Kiro CLI inferred I meant `flowops-dev-eks` from the prompt, used a dedicated `list_k8s_resources` MCP tool, and returned 9 services across three namespaces: flowops (6 application services, all Helm-managed), kube-system (2 infrastructure services), and default (the Kubernetes API server). It also provided deployment timeline context, noting the 6 app services were deployed in two waves and offered to dig deeper into deployments, pods, or endpoints.

Both tools reached for `kubectl` under the hood. The difference was in presentation: Yolo gave a structured table with inferred purpose descriptions for each service, while Kiro gave a namespace-grouped view with deployment chronology. Both useful, just different lenses on the same data.

### Prompt 5: "Can you give me a cost estimate by service within the cluster?"

I opted to share the outputs as separate images since there was too much content to reasonably split inline. Both tools appeared to use raw `kubectl` commands to inspect the EKS resources and then calculate cost allocations.

![Yolo CLI EKS cost estimate by service](/assets/yolo/eks-yolo-cost.png)

Yolo broke the response into multiple sections. First, a Service Resource Allocation table showing Replicas, CPU Request, Memory Request, Node, and percentage of node CPU/Memory for each service. Then an Estimated Monthly Cost per Service table allocating costs by CPU and Memory share with a blended share percentage. It followed that with an EKS Shared Infrastructure Costs table (Control Plane at ~$73, ALB at ~$16.20, EBS Storage at ~$11.54, Data Transfer as variable) and a final Total Estimated Cost per Service table combining Compute, EKS Share, ALB Share, and Storage into a per-service monthly total. Grand total: ~$225.21/month. It even included Key Insights noting that `agent-invoke` is the most resource-intensive (41% of compute), the cluster is under-utilized (only 30% CPU, 8% memory requested), and suggested consolidating to 1 node to save ~$61/month.

![Kiro CLI EKS cost estimate by service](/assets/yolo/eks-kiro-cost.png)

My Kiro CLI structured its response into three sections as well: Compute Resource Requests per Service (with CPU Request, Memory Request, CPU Limit, and Memory Limit), a Monthly Cost Estimate for us-west-2 (EKS cluster control plane, EC2 nodes, ALB, ACM certificate, ECR, totaling ~$200-205/mo), and a Cost Breakdown by Service proportional to resource requests. It also caught that the 3rd EC2 instance is in a different VPC and not part of this cluster, noting that is an additional ~$55/mo separately. It recommended enabling Cost Explorer for precise tracking.

The Yolo output has consistently been better formatted. I suspect I could improve my local setup's formatting through more explicit prompting, but the difference was noticeable throughout this comparison.

### Prompt 6: "Can you do a Well-Architected review over my AWS account and its services with special attention to security?"

This was the most ambitious prompt of the comparison, and I only ran it through Yolo. The output was extensive enough to warrant multiple screenshots.

![Yolo Well-Architected Review part 1: Executive Summary and Critical Security Findings](/assets/yolo/war-yolo-1.png)

Yolo produced a full Well-Architected Review with an Executive Summary table rating each pillar: Security at Medium Risk with 8 high-priority findings, Operational Excellence at Medium with 3 findings, Reliability and Performance both Good with minor findings, and Cost Optimization at Medium with 3 findings.

It then dove into Critical Security Findings. Finding 1: No IAM Password Policy configured, with a complete `aws iam update-account-password-policy` remediation command. Finding 2: No MFA on Root Account, flagging complete account compromise risk if credentials leak.

![Yolo Well-Architected Review part 2: EKS, Security Groups, and Kubernetes findings](/assets/yolo/war-yolo-2.png)

Finding 3: EKS API Server Publicly Accessible (`endpointPublicAccess: true` on flowops-dev-eks), with recommendations to restrict CIDR ranges or switch to private-only endpoint access. Finding 4: Security Groups allowing 0.0.0.0/0 access, with a table identifying three offending security groups including one exposing Redshift on port 5439 to the internet, flagged as critical with a ready-to-run `aws ec2 revoke-security-group-ingress` command. Finding 5: No Kubernetes Network Policies in the flowops namespace, with a sample default-deny NetworkPolicy YAML.

![Yolo Well-Architected Review part 3: Pod security, monitoring, tagging, and Security Strengths](/assets/yolo/war-yolo-3.png)

Finding 6: Pods Running as Root with no `runAsNonRoot: true` configured, including a full `securityContext` remediation snippet. Finding 7: EC2 Instances Without Detailed Monitoring. Finding 8: No Resource-Level Tags for Cost Allocation. It then listed Security Strengths: EBS Encryption enabled with KMS, S3 Encryption with KMS-SSE, and more.

![Yolo Well-Architected Review part 4: Full strengths table, other pillar findings, and Priority Action Plan](/assets/yolo/war-yolo-4.png)

The Security Strengths table continued with S3 Public Access Block, CloudTrail with multi-region log validation, GuardDuty with active threat detection, IMDSv2 enforced on all EC2 instances, EKS Control Plane Logging, and good VPC design with private subnets. It then covered Other Findings across Reliability (single AZ deployment, no RDS Multi-AZ), Performance (EBS not optimized), and Cost Optimization (cluster under-utilized at 30% CPU, no Reserved Instances/Savings Plans, 20 S3 buckets with some unused). A Priority Action Plan followed with Immediate (within 24 hours), Short-term (within 1 week), and Medium-term (within 1 month) categories.

![Yolo Well-Architected Review part 5: Security Score and Next Steps](/assets/yolo/war-yolo-5.png)

The review concluded with a Security Score of 72/100, broken down by category: Identity and Access at 60/100, Network Security at 70/100, Data Protection at 93/100, Logging and Monitoring at 85/100, and Incident Response at 75/100. It offered to generate the specific commands or Kubernetes manifests needed to implement any of the recommendations.

This was the most impressive Yolo output of the entire comparison. The depth, structure, and actionability of the findings, complete with copy-paste remediation commands and prioritized timelines, is exactly the kind of proactive resource management that differentiates a tool from a wrapper around `aws cli`.

Below are the slightly less verbose local Kiro CLI output screenshots for the same prompt.

![Kiro CLI Well-Architected Review part 1: Security Pillar with What's Good and Critical Findings](/assets/yolo/war-kiro-1.png)

My Kiro CLI organized the review by pillar, starting with the Security Pillar (Primary Focus). It led with "What's Good": IMDSv2 enforced, no public IPs, no IAM users (roles/federated access only), CloudTrail enabled with multi-region log file validation, GuardDuty active, EKS secrets encrypted with a customer-managed key, all 5 EKS control plane log types enabled, S3 public access blocked, and ALB using HTTPS with SSL cert and HTTP-to-HTTPS redirect. Then Critical Findings: EKS public endpoint open to 0.0.0.0/0 (with a link to the EKS docs on cluster endpoint access), Redshift security group open on port 5439, no Kubernetes NetworkPolicies (with a link to the EKS network policy docs), default VPC security groups allowing all inbound, no VPC Flow Logs (with a docs link), and EKS deletion protection disabled.

![Kiro CLI Well-Architected Review part 2: Reliability, Operational Excellence, and Performance Efficiency Pillars](/assets/yolo/war-kiro-2.png)

The Reliability Pillar noted single-replica deployments across all 6 flowops services, 2 AZs configured, ALB controller running 2 replicas with pod anti-affinity, EKS upgrade readiness passing for v1.32, and liveness/readiness probes on all services. Operational Excellence highlighted Infrastructure as Code via CDK/CloudFormation, Helm-managed deployments, no EKS managed add-ons, untagged EC2 instances, and a stale VPC that appears to be a leftover from a previous deployment. Performance Efficiency found resources right-sized for dev, EKS Auto Mode enabled, but all containers using `:latest` tags making rollbacks non-deterministic.

![Kiro CLI Well-Architected Review part 3: Cost Optimization Pillar and Priority Remediation List](/assets/yolo/war-kiro-3.png)

The Cost Optimization Pillar flagged 20 S3 buckets with apparent duplicates, 5 VPCs with one stale, and no Savings Plans or Reserved Instances for the 3 always-on c6a.large instances. It concluded with a Priority Remediation List table ranking 10 items by priority and effort, from restricting EKS public endpoint CIDRs (Priority 1, Low effort) down to cleaning up stale VPCs and duplicate S3 buckets (Priority 10, Low effort). It completed in 1 minute 19 seconds and offered to help remediate the low-effort changes directly.

I actually preferred my bespoke setup's output for this prompt since it covered each Well-Architected pillar in its own clearly defined section with a consistent structure. It also included documentation references inline, which is a nice touch for actionability. That said, the Yolo output was more comprehensive overall, with richer detail in the security findings and ready-to-run remediation commands.

## Analysis

### Where Yolo Shines

- Out-of-the-box experience is polished. Install it and go.
- Default prompt tuning is clearly optimized for AWS resource queries. It surfaces useful context proactively.
- Response speed was consistently faster, likely due to optimized prompt chains and tool orchestration.

### Where My Bespoke Setup Has the Edge

- Model control. I can always use the latest and most capable model available. With Yolo, you are on whatever model they have selected.
- Customizability. I can add, remove, or swap MCP servers and tailor the system prompt to my exact workflow.
- Extensibility. If I set up a dedicated custom sub-agent for AWS resource management with a tuned system prompt, the outputs would be nearly identical to Yolo's. The gap is largely a matter of prompt engineering effort, not capability.

### The Underlying Tooling is the Same

It was clear from observing both tools that they rely on very similar underlying mechanisms. Both lean heavily on native AWS CLI commands, and for EKS-related queries, both reach for `kubectl`. The differentiation is not in what tools they call but in how the prompts are structured and how the outputs are formatted.

## The Bigger Picture: Powers and Skills

This comparison reinforced something I have been thinking about for a while. Kiro "Powers," or more broadly "skills," are the ideal way to package these kinds of sub-agents with tailored prompts and tools. That is essentially what Yolo is: a packaged skill with a polished prompt layer on top of ubiquitous AWS tooling.

If I invested the time to build a dedicated AWS management Power with a refined system prompt and the right MCP servers pre-configured, the experience would converge with Yolo's. But that takes effort, and effort is the trade-off. Installing a CLI tool will always be faster than building a bespoke setup, even if the ceiling of the bespoke setup is higher.

## Where Yolo Could Differentiate

If Yolo can move beyond finely tuned prompts and ubiquitous tools into proactive resource management, there is meaningful differentiation to be had. Think automated cost optimization recommendations, drift detection, or migration assistance. If they can help teams migrate off expensive AWS wrapper services like Supabase onto native AWS services, that is real value, especially given the additional tooling setup required to manage both platforms.

## Conclusion

The first-touch hands-on experience with Yolo was fairly impressive. It was slightly better than my local setup out of the box, but I suspect that gap largely comes down to prompt tuning, which I did not spend time refining on my end. For someone who wants a fast, zero-config way to query AWS resources conversationally, Yolo is a solid choice. For someone who wants full control over the model, the tools, and the prompts, a bespoke Kiro setup with MCP servers is the way to go.

The real question is not which is better today. It is whether Yolo can build meaningful differentiation beyond prompt engineering, or whether the open ecosystem of MCP servers and agentic IDEs will commoditize what they offer. I am watching closely.
