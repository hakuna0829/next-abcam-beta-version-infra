terraform {
  required_version = "~> 0.12"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.61"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
  backend "s3" {}
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}