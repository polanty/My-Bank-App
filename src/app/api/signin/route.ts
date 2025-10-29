// app/api/signin/route.ts
import { NextResponse } from "next/server";
import { signInUserUsingEmailandPassword } from "@/app/Firebase/Firebase";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = bodySchema.parse(body);

    const user = await signInUserUsingEmailandPassword(email, password);

    return NextResponse.json(
      { uid: user?.uid, email: user?.email },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
