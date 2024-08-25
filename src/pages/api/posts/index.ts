import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

//* Permite que este endpoint se cree en el servidor (se obtenga la data bajo demando y no desde un archivo JSON estático)
export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const posts = await getCollection("blog");
  //* Obteniendo query string de "slug"
  const slug = url.searchParams.get("slug");
  // console.log(slug);


  if (slug) {
    //* Obtiene una entrada de blog segun el slug especificado 
    const post = await getEntry('blog', slug);

    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

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

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
