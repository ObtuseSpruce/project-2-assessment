const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widget =>{
        res.render('home', {widget})
    })
    .catch((err) => {
        console.log('get error', err)
        res.send('error')
    })
})

app.post('/submit', (req, res) =>{
    console.log(req.body.name)
    db.widget.create({
        name: req.body.name,
        quantity: req.body.quantity
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
        console.log('post error', err)
        res.send('error')
      })
})

app.delete('/:id', (req, res) =>{
    db.widget.destroy({
       where: { id: req.params.id}
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
        console.log('delete error', err)
        res.send('error')
      })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000);
