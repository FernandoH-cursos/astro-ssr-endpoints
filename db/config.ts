import { column, defineDb, defineTable, like } from 'astro:db';

//* Crea la tabla 'clients' 
const Clients = defineTable({
  columns: {
    //* PK de tabla 
    id: column.number({primaryKey: true}),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  },
});

const Posts = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    likes: column.number(),
  },
});

// https://astro.build/db/config
//* Crea DB con sus tablas definidas 
export default defineDb({
  tables: {
    Clients,
    Posts,
  },
});
