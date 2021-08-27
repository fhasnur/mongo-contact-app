const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});



// // Menambah 1 data
// const contact1 = new Contact({
//     nama: "Fandi Hasnur",
//     nohp: "08213456789",
//     email: "fandi@gmail.com"
// })

// // Simpan ke collection
// contact1.save().then((contact) => console.log(contact))