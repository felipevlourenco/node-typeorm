import { TransactionTypes } from './../entities/Transaction'
import express from 'express'
import { Client } from '../entities/Client'
import { Transaction } from '../entities/Transaction'

const router = express.Router()

router.post('/api/client/:clientId/transaction', async (req, res): Promise<any> => {
  const { clientId } = req.params
  console.log(`- clientId`, clientId)

  const { type, amount } = req.body

  // if (type !== TransactionTypes.DEPOSIT || type !== TransactionTypes.WITHDRAW) {
  //   return res.status(403)
  // }

  const client = await Client.findOne(parseInt(clientId))

  if (!client) {
    return res.json({
      msg: 'Client not found!'
    })
  }

  const transaction = Transaction.create({
    amount,
    type,
    client
  })

  await transaction.save()

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = +client.balance + parseInt(amount)
  } else {
    client.balance = +client.balance - parseInt(amount)
  }

  await client.save()

  return res.json({
    msg: 'Transaction add!'
  })
})

export { router as createTransactionRouter }
