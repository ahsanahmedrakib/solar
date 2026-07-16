export function isTableNotExistsError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("relation") && message.includes("does not exist");
}
