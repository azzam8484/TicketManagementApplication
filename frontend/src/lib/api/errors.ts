import type { ApiErrorBody } from "@/types/ticket";

/**
 * Normalized API failure for UI layers (F2).
 * Prefer `message` and optional `fields` per ui-flow.md.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: Record<string, string>;

  constructor(
    status: number,
    code: string,
    message: string,
    fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }

  get isValidation(): boolean {
    return this.status === 400 || this.code === "VALIDATION_ERROR";
  }

  get isNotFound(): boolean {
    return this.status === 404 || this.code === "NOT_FOUND";
  }

  get isConflict(): boolean {
    return this.status === 409 || this.code === "INVALID_STATUS_TRANSITION";
  }
}

export async function toApiError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;

  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = undefined;
  }

  const code = body?.code ?? "UNKNOWN_ERROR";
  const message =
    body?.message ??
    (response.status >= 500
      ? "Something went wrong"
      : `Request failed with status ${response.status}`);

  return new ApiError(response.status, code, message, body?.fields);
}
