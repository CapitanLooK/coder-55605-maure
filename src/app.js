import express from 'express'
import { ProductManager } from '../ProductManager.js'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./data/products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts();
        if (isNaN(limit) || limit < 1) {
            res.status(200).json(products)
        } else {
            res.status(200).json(products.slice(0, limit))
        }
    }

    catch (err) {
        res.status(500).send({ err: err.message })
    }

})

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json({ error: `Producto con id ${productId} no encontrado` })
        }
    }
    catch (err) {
        res.status(500).send({ err: err.message })
    }
})


app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})