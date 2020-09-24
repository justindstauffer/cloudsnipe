const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())



const user = require('./routes/user')

app.use('/api/user', user)


app.get('/', function (req, res) {
    res.send('Hello from CloudSnipe')
})

// Set port
const port = process.env.PORT || 5000
// Open server listener
app.listen(port, () => console.log(`Server started on port ${port}`))
