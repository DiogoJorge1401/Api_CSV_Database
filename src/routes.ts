import { Router, Request, Response } from 'express'
import { client } from './database/client'
import { Readable } from 'stream'
import readline from 'readline'
import multer from 'multer'

const multerConfig = multer()
const routes = Router()

routes.post(
  '/products',
  multerConfig.single('file'),
  async (req: Request, res: Response) => {
    const { file } = req
    const buffer = file?.buffer

    const readableFile = new Readable()
    readableFile.push(buffer)
    readableFile.push(null)

    const productsLine = readline.createInterface({
      input: readableFile,
    })

    const products = []

    for await (let line of productsLine) {
      const [code_bar, description, price, quantity] = line.split(',')

      const product = {
        code_bar,
        description,
        price,
        quantity: parseInt(quantity),
      }

      products.push(product)

      await client.products.create({
        data: product,
      })
    }

    return res.json(products)
  }
)

export { routes }
