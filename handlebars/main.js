const express = require('express')
const { engine } = require('express-handlebars')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
}))

app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const products = []

app.get('', (req, res) => {
    const data = {
        mensaje: 'Ingrese un producto'
    }
    return res.render('layouts/main', data)
})

app.get('/productos', (req, res) => {
    let data = {}
    if (products.length === 0) {
        data = {
            message: 'No hay productos para mostrar'
        }
    } else {
        data = {
            products
        }
    }
    return res.render('layouts/products', data)
})

app.post('/productos', (req, res) => {
    const newProduct = req.body
    newProduct.id = products.length + 1
    
    products.push(newProduct)

    return res.status(201).json(newProduct)
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))