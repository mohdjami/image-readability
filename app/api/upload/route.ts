import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || "";
    if (filename && request.body) {
      const blob = await put(filename, request.body, {
        access: "public",
      });
      return NextResponse.json(blob);
    } else {
      return new NextResponse("No filename specified", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: Request) {
  const { url } = await req.json();
  await del(url);
  return NextResponse.json({
    message: "success",
  });
}
