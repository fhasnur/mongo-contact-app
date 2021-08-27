const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

// Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true}))

// Konfigurasi flash
app.use(cookieParser('secret'))
app.use(
  session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)
app.use(flash())

// Halaman Home
app.get('/', (req, res) => {
  const mahasiswa = [
    {
    nama: 'Fandi Hasnur',
    email: 'fandi.hasnur10@gmail.com',
    },
    {
    nama: 'Adhan Akbar',
    email: 'adhan12@gmail.com',
    },
    {
    nama: 'Umat Madani',
    email: 'umat14@gmail.com',
    }
  ]
  res.render('index', { 
    title: 'NodeJS Web Server', 
    nama : 'Fandi Hasnur',
    mahasiswa,
    layout: 'layouts/main-layout',
  })
})

// Halaman About
app.get('/about', (req, res) => {
  res.render('about', { 
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  })
})

// Halaman Contact
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find()

  res.render('contact', { 
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg')
  })
})

// Halaman detail contact
app.get('/contact/:nama', async (req, res) => {

  const contact = await Contact.findOne({ nama: req.params.nama})

  res.render('detail', { 
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact
  })
})

app.listen(port, () => {
    console.log(`Mongo Contact App : listening at http://localhost:${port}`)
})