# Tools & Technologies

## Coding Language: Java
- Familiarity and ease of use with JUnit, Maven, etc

## Testing: JUnit
- Familiarity with the testing capabilities of JUnit
- Used side-by-side with Java
  
## Project setup and integration: Maven
- Familiarity and ease of use
- Powerful package and project tool
  
## Software Tools: S3 AWS CLI
- **link**: https://www.bing.com/ck/a?!&&p=094012c9f504f432JmltdHM9MTcwOTA3ODQwMCZpZ3VpZD0yZTg1OGVlYS02MmRjLTYwNjUtMjgwYS05ZTk3NjNiODYxZDMmaW5zaWQ9NTIxMA&ptn=3&ver=2&hsh=3&fclid=2e858eea-62dc-6065-280a-9e9763b861d3&psq=What+is+the+S3+CLI&u=a1aHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2NsaS9sYXRlc3QvdXNlcmd1aWRlL2NsaS1zZXJ2aWNlcy1zMy5odG1s&ntb=1
- The S3 CLI (Command Line Interface) is a powerful tool provided by Amazon Web Services (AWS) for managing and interacting with Amazon Simple Storage Service (S3).
- Here are some key points about the S3 CLI:
  1. High-Level Commands:
    - The S3 CLI offers high-level commands that simplify common tasks related to S3, such as creating, manipulating, and deleting objects and buckets.
    - These commands are designed to be user-friendly and abstract away the underlying complexity of S3 operations.
  2. Path Arguments:
    - Whenever you use an S3 CLI command, you need to specify at least one path argument.
    - Here are two types of path arguments:
      1) LocalPath: Represents the path of a local file or directory on your system.
      2) S3Uri: Represents the location of an S3 object, prefix, or bucket.
        - The S3Uri format is s3://mybucket/mykey, where mybucket is the specified S3 bucket and mykey is the specified S3 key.
        - Prefixes within buckets are separated by forward slashes (e.g., myprefix/myobject).
        - S3Uri also supports S3 access points (e.g., s3://<access-point-arn>/<key>).
  3. Order of Path Arguments:
    - Every command takes one or two positional path arguments.
    - The first path argument represents the source (local file/directory or S3 object/prefix/bucket).
    - If there’s a second path argument, it represents the destination (local file/directory or S3 object/prefix/bucket).
  4. Single File and Object Operations:
    - Some commands operate only on single files and S3 objects (e.g., cp, mv, rm).
    - If no --recursive flag is provided, these commands work on individual files/objects.
    - The source must exist and be a local file or S3 object.
    - The destination can be a local file, local directory, S3 object, S3 prefix, or S3 bucket.
    - The use of a trailing slash in the destination indicates a local directory or S3 prefix.
  5. Examples of S3 CLI Commands:
    - To upload a local file to S3: aws s3 cp localfile.txt s3://mybucket/myobject
    - To move an S3 object to a different location: aws s3 mv s3://mybucket/myobject s3://mybucket/newprefix/myobject
    - To delete an S3 object: aws s3 rm s3://mybucket/myobject
