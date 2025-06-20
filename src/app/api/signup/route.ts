// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { createNewUserWithData } from "@/app/Firebase/Firebase";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(3),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, displayName } = bodySchema.parse(body);

    const user = await createNewUserWithData(email, password, displayName);

    return NextResponse.json(
      { uid: user.uid, email: user.email },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
