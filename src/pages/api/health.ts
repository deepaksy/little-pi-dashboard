import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${backendUrl}/api/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Little Pi is unresponsive" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ message: "Offline / Connection Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};