import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transaction'

const app = fastify()

// instanciado um plugin
app.register(transactionsRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
