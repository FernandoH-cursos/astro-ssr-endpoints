import { defineAction, z } from "astro:actions";
import { db, eq, Posts } from "astro:db";

//? Server Action para dar likes a un post
export const getPostLikes = defineAction({
  //* Define que tipo de dato puede aceptar, puede ser "json" o "form" (Form Data)
  accept: "json",
  //* Se define el esquema con zod de lo que va a recibir en el handler este server action.
  //* En este caso solo recibe el post id que es un string.
  input: z.string(),
  //* Este es el handler que se ejecuta al invocar el server actions (es SERVER ONLY), puede retornar el dato que uno requiera
  handler: async (postId) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));

    return { likes: post.likes ?? 0 };
  },
});
