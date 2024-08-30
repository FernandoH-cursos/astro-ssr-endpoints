import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async () => {
  const clients = await db.select().from(Clients);

  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log(body);

    await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({
        method: request.method,
        msg: "Cliente creado correctamente",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        msg: "No body found",
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
