const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb+srv://nayansigupta29:ott0XfH2VQl5UF4H@cluster0.hvoec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(connection => {
    console.log("Connected To Database")
}).catch(err => {
    console.log("Error in database connection.", err)
})




