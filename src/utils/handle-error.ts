type ResError = {
  data: {
    error: string
  }
}

export function handleError(error: unknown): null | string {
  if (!error) {
    return null;
  }

  const message = error as ResError;
  return message.data.error;
}
