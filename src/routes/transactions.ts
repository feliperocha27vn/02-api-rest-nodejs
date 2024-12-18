import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

// instanciando o APP pois TS reclama se não falar o que ele é
export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return {
      transactions,
    }
  })

  app.get('/:id', async (request) => {
    // validação com zod
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    })
    // transformando e pegando o ID do request
    const { id } = getTransactionParamSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id)

    return { transaction }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // desestruturando o body
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // selecionando a tabela e inserindo
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      // lógica para o resumo final das transações
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
