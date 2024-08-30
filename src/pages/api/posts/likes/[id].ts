import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const postId = params.id;

  const posts = await db.select().from(Posts).where(eq(Posts.id, postId!));
  if (posts.length === 0) {
    const post = {
      id: postId,
      title: 'Post not found',
      likes: 0,
    }

    return new Response(JSON.stringify(post), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(posts.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const PUT: APIRoute = async ({ params,request }) => {
  try {
    //* Pasando cantidad de likes presionados y el post id 
    const {likes = 0} = await request.json();
    const postId = params.id ?? '';

    //* Insertando un nuevo post base con 0 likes si este no existe en la BD 
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
    if (posts.length === 0) {
      const newPost = {
        id: postId,
        title: "Post not found",
        likes: 0,
      };

      await db.insert(Posts).values(newPost);
      posts.push(newPost);
    }

    //* Sumando cantidad de likes a post existente 
    const post = posts.at(0)!;
    post.likes = post.likes + likes;

    //* Guardando estos likes actualizados en la BD 
    await db.update(Posts).set(post).where(eq(Posts.id, postId));

    return new Response('Ok', { status: 200 });
    
  } catch (error) {
    console.log(error);
    return new Response('error', { status: 500 });
  }
};