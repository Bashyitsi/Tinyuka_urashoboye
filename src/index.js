const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/courses', (req, res) => {
    res.render('courses')
})
app.get('/team', (req, res) => {
    res.render('team')
})
app.get('/testimonial', (req, res) => {
    res.render('testimonial')
})
app.get('/index', (req, res) => {
    res.render('index')
})
app.get('/program', (req, res) => {
    res.render('program')
})

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const checking = await LogInCollection.findOne({ email: req.body.email })

        if (checking) {
            res.send("User details already exist")
        } else {
            await LogInCollection.create(data)
            res.status(201).render("login", { naming: req.body.firstname })
        }
    } catch (error) {
        res.send("Error occurred while processing request")
    }
})

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ email: req.body.email })

        if (check.password === req.body.password) {
            res.status(201).render("index", { naming: `${req.body.firstname}+${req.body.lastname}` })
        } else {
            res.send("Incorrect password")
        }
    } catch (error) {
        res.send("Wrong details")
    }
})
app.listen(port, () => {
    console.log('Port connected');
})