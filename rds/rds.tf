
locals {
  port_http  = 80
  port_https = 443
  port_mysql = 3306
  port_postgres = 5432
  port_ssh   = 22
}


data "aws_vpc" "default_vpc_data" {
  default = true
}

resource "aws_security_group" "instance_security_group" {
  name   = "allow_ec2_instance_mysql"
  vpc_id = data.aws_vpc.default_vpc_data.id

  ingress {
    from_port        = local.port_mysql
    to_port          = local.port_mysql
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    from_port        = local.port_ssh
    to_port          = local.port_ssh
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    from_port        = local.port_https
    to_port          = local.port_https
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    from_port        = local.port_http
    to_port          = local.port_http
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    from_port        = local.port_postgres
    to_port          = local.port_postgres
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_db_instance" "learningplanner_production_db" {
  identifier             = "learningplanner-production-db"
  db_name                = "learningplanner_production"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = "postgres"
  password               = "var.db_password"
  skip_final_snapshot    = true
  port                   = 3306
  publicly_accessible    = false
  availability_zone      = "ap-south-1a"
  vpc_security_group_ids = [aws_security_group.database_security_group_rds_production.id]
}


resource "aws_security_group" "database_security_group_rds_production" {
  name = "rds-ec2-sg-production"

  ingress {
    from_port       = 3306
    protocol        = "tcp"
    to_port         = 3306
    security_groups = [aws_security_group.instance_security_group.id]
  }
}


resource "aws_db_instance" "learningplanner_development_db" {
  identifier             = "learningplanner-development-db"
  db_name                = "learningplanner_development"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = "postgres"
  password               = "var.db_password"
  skip_final_snapshot    = true
  port                   = 5432
  publicly_accessible    = false
  availability_zone      = "ap-south-1a"
  vpc_security_group_ids = [aws_security_group.database_security_group_rds_development.id]
}


resource "aws_security_group" "database_security_group_rds_development" {
  name = "rds-ec2-sg-development"

  ingress {
    from_port       = 5432
    protocol        = "tcp"
    to_port         = 5432
    security_groups = [aws_security_group.instance_security_group.id]
  }
}