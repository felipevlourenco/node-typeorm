import express from 'express'
import { createConnection } from 'typeorm'
import { Client } from './entities/Client'
import { Banker } from './entities/Banker'
import { Transaction } from './entities/Transaction'
import { createClientRouter } from './routes/create_client'
import { createBankerRouter } from './routes/create_banker'
import { createTransactionRouter } from './routes/create_transaction'
import { connectBankerToClient } from './routes/connect_banker_to_client'
import { deleteClientRouter } from './routes/delete_client'
import { fetchClientsRouter } from './routes/fetch_clients'

const app = express()

const main = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'felipe',
      password: undefined,
      database: 'typeorm',
      entities: [Client, Banker, Transaction],
      synchronize: true
    })

    console.log('Connected to Postgres')

    app.use(express.json())
    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(createTransactionRouter)
    app.use(connectBankerToClient)
    app.use(deleteClientRouter)
    app.use(fetchClientsRouter)
    app.listen(8080, () => {
      console.log('Listening on port 8080')
    })
  } catch (error) {
    console.log(error)
    throw new Error('Unable to connect to Postgres')
  }
}

main()
