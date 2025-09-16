export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  const response = await fetch(url, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });
  return response;
}

export const isSimulationMode = "false";