// Backend - presigned URL generation (Node.js with AWS SDK)
const AWS = require("aws-sdk");
const express = require("express");
const app = express();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Store securely
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Store securely
  region: "us-east-1", // Your S3 bucket's region
});

app.get("/api/s3Url", async (req, res) => {
  const params = {
    Bucket: "your-bucket-name", // Your S3 bucket name
    Key: `${Date.now()}.png`, // File name you want to upload
    Expires: 60, // URL expiration time in seconds
    ContentType: "image/png", // Allow only PNG files
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    res.json({ uploadURL });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).send("Error generating URL");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
//da9d727edd3bda09e2f103bf144805eb
//258e0f39230d3af6d00f0d4552b76cbe
