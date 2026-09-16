export async function apiHandler<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${url}`,
    options,
  );

  if (!res.ok) {
    let errorMessage = "Something went wrong.";

    try {
      const errorData = await res.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      errorMessage = res.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const text = await res.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
