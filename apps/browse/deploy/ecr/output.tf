output "ECR_URL" {
  value = module.aws_ecr_repo.ecr_url
}
output "ECR_IMAGE_NAME" {
  value = module.aws_ecr_repo.ecr_name
}