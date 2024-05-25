import { NextResponse } from "next/server";

type ResError = {
  data: {
    error: string;
  };
};

export function handleError(error: unknown): null | string {
  if (!error) {
    return null;
  }

  const message = error as ResError;
  return message.data.error;
}

export function handleCatchError(err: unknown, message: string): Response {
  const error =
    err instanceof Error
      ? process.env.NODE_ENV !== "production"
        ? err.message
        : message
      : "Unexpected Error";
  return NextResponse.json({ error }, { status: 500 });
}
