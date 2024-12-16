import { knex as SetupNex } from 'knex'

export const knex = SetupNex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
