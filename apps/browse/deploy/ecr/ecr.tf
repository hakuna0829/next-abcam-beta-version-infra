module "aws_ecr_repo" {
  source = "git::ssh://git@gitlab.abcam.com/devops/terraform-modules/aws-ecr-repository.git//module?ref=master"

  name         = var.ecr_name
  scan_on_push = true
  tags = {
    System  = var.system
    Project = var.project
  }
  tag_mutability = "MUTABLE"
}
