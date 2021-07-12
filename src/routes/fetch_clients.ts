import express from 'express'
import { createQueryBuilder } from 'typeorm'
import { Client } from './../entities/Client'

const router = express.Router()

router.get('/api/client', async (req, res) => {
  const client = await createQueryBuilder('client')
    .select('client')
    .from(Client, 'client')
    .leftJoin('client.transactions', 'transactions')
    .where('client.id = :clientId', { clientId: 4 })
    .getOne()

  res.json(client)
})

export { router as fetchClientsRouter }
