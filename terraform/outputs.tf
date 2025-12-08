output "instance_id" {
  description = "EC2 instance id"
  value       = aws_instance.my_server.id
}

output "instance_public_ip" {
  description = "Public IP of instance"
  value       = aws_instance.my_server.public_ip
}
