const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

const products = []

app.get('/', (req, res) => {
    const data = {
        message: 'Ingrese un producto'
    }
    return res.render('main', data)
})

app.get('/productos', (req, res) => {
    const data = {
        products
    }
    return res.render('products', data)
})

app.post('/productos', (req, res) => {
    const newProduct = req.body
    newProduct.id = products.length + 1
    
    products.push(newProduct)

    return res.status(201).json(newProduct)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP corriendo en puerto ${PORT}`)
})
server.on('error', error => {
    console.log(`Error en el servidor: ${error}`)
})