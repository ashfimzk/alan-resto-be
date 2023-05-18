const express = require('express');
const app = express()
const cors = require('cors')
app.use(express.json()) // body Parser : mengambil data yang dikirimkan oleh client melalui body
app.use(cors())

// app.use('/Public', express.static('Public'))
const path = require("path");
const { join } = require("path");
app.use('/Public', express.static(path.join(__dirname, '/Public')))

const PORT = 5010


// const Sequelize = require('sequelize');
// const Models = require('./models');
// Models.sequelize.sync({
//     force : false,
//     alter: true,
//     logging : console.log
// }).then(function () {
//     console.log('Database is Synchronized!')

// }).catch(function (err) {
//     console.log(err, "Something Went Wrong with Database Update!")
// });


app.get('/', (req, res) => {
    res.status(201).send(`<h1>Welcome to JCWD-2302 API</h1>`)
})

//import Router
const { userRouter } = require('./router')
const { productRouter } = require('./router')

app.use('/user', userRouter)
// // app.use('/products', productRouter)

app.use('/product',productRouter)


app.listen(PORT, () => console.log(`API Running on Port ${PORT}`))