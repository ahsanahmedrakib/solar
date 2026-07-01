import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function saveImageToDB(
  base64Data: string,
  folderName: string,
  id: string | number,
): Promise<string> {
  const matches = base64Data.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image data");
  }

  const contentType = matches[1] === "jpeg" ? "image/jpeg" : `image/${matches[1]}`;
  const buffer = Buffer.from(matches[2], "base64");

  const { db } = await connectToDatabase();

  const result = await db.collection("images").insertOne({
    data: buffer,
    contentType,
    folderName,
    resourceId: String(id),
    createdAt: new Date(),
  });

  return `/api/image/${result.insertedId.toString()}`;
}

export async function getImageFromDB(imageId: string): Promise<{
  data: Buffer;
  contentType: string;
} | null> {
  try {
    const { db } = await connectToDatabase();
    const doc = await db
      .collection("images")
      .findOne({ _id: new ObjectId(imageId) });
    if (!doc) return null;
    return { data: doc.data.buffer, contentType: doc.contentType };
  } catch {
    return null;
  }
}

export async function deleteImageFromDB(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith("/api/image/")) return;

  const imageId = imageUrl.replace("/api/image/", "");
  try {
    const { db } = await connectToDatabase();
    await db.collection("images").deleteOne({ _id: new ObjectId(imageId) });
  } catch (error) {
    console.error("Failed to delete image from DB:", imageUrl, error);
  }
}
