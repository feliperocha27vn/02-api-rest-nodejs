import { expect, test } from 'vitest'

test('uma nova transação criada pelo o usuário', () => {
  const httpRespondeStatus = 501

  expect(httpRespondeStatus).toEqual(201)
})
