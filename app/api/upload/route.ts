import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const uploadMiddleware = upload.single("file");
export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log(file);

    return NextResponse.json({ status: "success", data: file });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
