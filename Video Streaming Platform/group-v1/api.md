# API Documentation

## Data Router's API

Our data router has 2 endpoints for allowing users to upload files to the system and retrieve their uploaded files.

### Put Object

The endpoint for putting a file is `PUT /bucket/key` where bucket and key are the bucket and key you want your object to have. Send an HTTP PUT request to that endpoint with the `content-length` header set to the length of the file and the request body containing the file contents.

This endpoint is designed to be compatible with the [putObject](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3.html#putObject-java.lang.String-java.lang.String-java.io.File-) methods in the [AWS Java SDK For Amazon S3](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3). Below is a code example: 

```java
void putObject(AmazonS3 s3Client, String bucket, String key, File file) {
    s3Client.putObject(bucket, key, file);
}
```

### Get Object

The endpoint to retrieve a stored file is `GET /bucket/key` where bucket and key are the bucket and key of the object you want to retrieve.

This endpoint is also compatible with the [getObject](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3.html#getObject-java.lang.String-java.lang.String-) methods in the [AWS Java SDK For Amazon S3](https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3). Below is a code example:

```java
S3Object getObject(AmazonS3 s3Client, String bucket, String key) {
    return s3Client.getObject(bucket, key);
}
```
