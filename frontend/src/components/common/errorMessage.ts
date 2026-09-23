import { ApiError } from "@/lib/api";

/**
 * Turn unknown failures into UI-friendly copy (ui-flow.md error rules).
 */
export function resolveErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status >= 500) {
      return error.message && error.message !== "Unexpected server failure"
        ? `Something went wrong. ${error.message}`
        : "Something went wrong";
    }
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong";
}

export function resolveErrorFields(
  error: unknown,
): Record<string, string> | undefined {
  if (error instanceof ApiError && error.fields) {
    return error.fields;
  }
  return undefined;
}
