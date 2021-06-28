variable "environment" {
  description = "Environment to which we're deploying: dev/test/loadtest/staging/preprod/prod"
  type        = string
}
variable "application_k8s_namespace" {
  description = "Name of the Kubernetes Namespace to create for this application. This can be the same name as the application/service, but must be a valid Kubernetes Namespace."
}