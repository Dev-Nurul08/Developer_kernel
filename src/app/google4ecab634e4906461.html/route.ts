import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("google-site-verification: google4ecab634e4906461.html", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
