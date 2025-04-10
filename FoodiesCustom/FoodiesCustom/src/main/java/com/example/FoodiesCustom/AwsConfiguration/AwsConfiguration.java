package com.example.FoodiesCustom.AwsConfiguration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsConfiguration {

    @Value("${aws.access.key}")
    private String accessKey ;

    @Value("${aws.secret.key}")
    private String passKey ;

    @Value("${aws.region}")
    private String region ;

    @Bean
    public S3Client getS3Client(){            // entry point of S3 operations from this spring boot application
        System.out.println(Region.of(region));
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey , passKey)))
                .build();
    }
}
