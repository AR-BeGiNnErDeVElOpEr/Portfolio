import { NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume");

  if (!(file instanceof File)) {
    return NextResponse.json({error:"No resume file provided."}, {status:400});
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({error:"Only PDF resumes are supported."}, {status:400});
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({error:"Resume must be smaller than 10 MB."}, {status:400});
  }

  const destination = path.join(process.cwd(), "public", "Ammar-Riaz-Resume.pdf");
  await writeFile(destination, Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({url:"/Ammar-Riaz-Resume.pdf"});
}
