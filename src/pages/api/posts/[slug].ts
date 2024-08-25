import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";

//* Permite que este endpoint se cree en el servidor si está en modo "hybrid"
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  //* Obteniendo path params
  const { slug } = params;

  const post = await getEntry("blog", slug!);
  // console.log(post);

  if (!post) {
    return new Response(
      JSON.stringify({
        message: `El post '${slug}' no encontrado`,
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  //* Obteniendo body en formato JSON
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ...body,
      method: request.method,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PUT: APIRoute = async ({ request }) => {
  //* Obteniendo body en formato JSON
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ...body,
      method: request.method,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  //* Obteniendo body en formato JSON
  const body = await request.json();

  return new Response(
    JSON.stringify({
      ...body,
      method: request.method,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const DELETE: APIRoute = async ({ request,params }) => {
  const { slug } = params;

  return new Response(
    JSON.stringify({
      method: request.method,
      slug,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

//* Permite crear un endpoint de manera estática(SSG - JSON estático), esta es una alternativa
//* a SSR(prerender = false) cuando el modo es "hybrid"
/* export const getStaticPaths: GetStaticPaths = async () => {
  return [
    {
      params: {slug: 'first-post'}
    }
  ];
} */
