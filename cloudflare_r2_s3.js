import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { loadEnvFile } from "node:process";

loadEnvFile()
const bucketName = "first-bucket";

const s3 = new S3Client({
  region: "auto", // Required by AWS SDK, not used by R2
  // Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
  endpoint: process.env.ENDPOINT,
  credentials: {
    // Provide your R2 Access Key ID and Secret Access Key
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_SECRET,
  },
});

async function uploadFile(filename){
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: "Hello, R2!",
      }),
    );
    // Upload a file
    console.log(`Uploaded ${filename}`);
}

async function getPresignedUrl(filename){
    const getUrl = await getSignedUrl(
  S3,
  new GetObjectCommand({ Bucket: bucketName, Key: filename}),
  { expiresIn: 3600 }, // Valid for 1 hour
);
}