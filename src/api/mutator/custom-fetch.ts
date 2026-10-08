import { env } from "@/config/env";
import { ApiError } from "./api-error";

type ErrorBody = {
  error?: { code?: string; message?: string; details?: unknown };
};

async function parseBody(res: Response): Promise<unknown> {
  if ([204, 205, 304].includes(res.status)) return undefined;
  const text = await res.text();
  if (!text) return undefined;
  return res.headers.get("content-type")?.includes("json")
    ? JSON.parse(text)
    : text;
}

/**
 * Orval mutator: every generated request goes through here.
 * Add auth headers, refresh-on-401 and tracing in this one place.
 */
export async function customFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(new URL(url, env.NEXT_PUBLIC_API_URL), {
    ...options,
    headers: { Accept: "application/json", ...options.headers },
  });

  const body = await parseBody(res);

  if (!res.ok) {
    const err = (body as ErrorBody | undefined)?.error;
    throw new ApiError(
      res.status,
      err?.code ?? "UNKNOWN_ERROR",
      err?.message ?? res.statusText ?? "Request failed",
      err?.details,
    );
  }

  return body as T;
}

export type ErrorType<E> = ApiError & { details?: E };
export type BodyType<B> = B;
