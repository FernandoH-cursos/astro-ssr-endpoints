import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const clientId = parseInt(params.clientId!);

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, clientId));

  return new Response(JSON.stringify(client), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const body = await request.json();
    const clientId = parseInt(params.clientId!);

    await db.update(Clients).set(body).where(eq(Clients.id, clientId));

    return new Response(
      JSON.stringify({
        method: request.method,
        msg: "Cliente actualizado correctamente",
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

export const DELETE: APIRoute = async ({ request, params }) => {
  const clientId = parseInt(params.clientId!);

  const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, clientId));
  
  if (rowsAffected > 0) {
    return new Response(
      JSON.stringify({
        method: request.method,
        msg: "Cliente eliminado correctamente",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );    
  }

  return new Response(
    JSON.stringify({
      method: request.method,
      msg: `Cliente con id '${clientId}' no encontrado`,
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

};
