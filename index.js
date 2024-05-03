require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000
const app = express();

const userRegisterRouter = require('./routes/route')

app.use(userRegisterRouter)

require('./databases/database')
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})