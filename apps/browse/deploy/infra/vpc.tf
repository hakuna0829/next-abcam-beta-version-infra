data "aws_ssm_parameter" "vpc_id" {
  name = "/terraform/vpc_id"
}

data "aws_vpc" "selected" {
  id = data.aws_ssm_parameter.vpc_id.value
}

data "aws_ssm_parameter" "abcam_office_cidrs" {
  name = "/terraform/network/abcam_office_cidrs"
}

data "aws_ssm_parameter" "internal_monitoring_cidrs" {
  name = "/terraform/network/internal_monitoring_cidrs"
}

resource "aws_security_group" "browse" {
  name        = "yeti-browse_lb_access"
  description = "sg for ALB of yeti browse app"
  vpc_id      = data.aws_vpc.selected.id

  dynamic "ingress" {
    for_each = split(",", data.aws_ssm_parameter.abcam_office_cidrs.value)
    content {
      cidr_blocks = [ingress.value]
      description = "abcam_office_cidrs rule"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
    }
  }

  dynamic "ingress" {
    for_each = split(",", data.aws_ssm_parameter.internal_monitoring_cidrs.value)
    content {
      cidr_blocks = [ingress.value]
      description = "internal_monitoring_cidrs rule"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
    }
  }

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    protocol    = "-1"
    from_port   = "0"
    to_port     = "0"
  }

  tags = {
    Name        = "yeti-browse_lb_access",
    Project     = "YETI"
    System      = "ekscalibur-${var.environment}",
    Environment = var.environment
  }
}
