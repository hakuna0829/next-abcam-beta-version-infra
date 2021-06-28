variable "system" {
  description = "Name of the system or environment where these resources are deployed."
  type        = string
}
variable "project" {
  description = "The internal name of the project to which these resources belong."
  type        = string
}
variable "ecr_name" {
  description = "The name of the aws ecr repository. Ideally it will match the gitlab repo"
  type        = string
}