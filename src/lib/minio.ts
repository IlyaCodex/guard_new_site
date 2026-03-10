import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin123",
});

const BUCKET = process.env.MINIO_BUCKET || "guardtunnel";

// Публичный URL для браузера
function getPublicUrl(fileName: string): string {
  const publicUrl = process.env.NEXT_PUBLIC_MINIO_URL;
  if (publicUrl) {
    return `${publicUrl}/${BUCKET}/${fileName}`;
  }
  const endpoint = process.env.MINIO_ENDPOINT || "localhost";
  const port = process.env.MINIO_PORT || "9000";
  return `http://${endpoint}:${port}/${BUCKET}/${fileName}`;
}

// Инициализация бакета
export async function initBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET);
    if (!exists) {
      await minioClient.makeBucket(BUCKET);
      console.log(`✅ Bucket "${BUCKET}" created`);
    }

    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${BUCKET}/*`],
        },
      ],
    };

    await minioClient.setBucketPolicy(BUCKET, JSON.stringify(policy));
    console.log(`✅ Bucket "${BUCKET}" policy set to public-read`);
  } catch (error) {
    console.error("MinIO init error:", error);
  }
}

// Загрузка файла
export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string,
): Promise<string> {
  await initBucket();

  const uniqueName = `${Date.now()}-${fileName}`;

  await minioClient.putObject(BUCKET, uniqueName, file, file.length, {
    "Content-Type": contentType,
  });

  return getPublicUrl(uniqueName);
}

// Удаление файла
export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];

    if (fileName) {
      await minioClient.removeObject(BUCKET, fileName);
    }
  } catch (error) {
    console.error("MinIO delete error:", error);
  }
}

export default minioClient;
