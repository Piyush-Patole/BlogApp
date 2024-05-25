const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', {posts: posts});
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const newPost = {id: Date.now(), title: req.body.title, content: req.body.content };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', {post: post});
});

app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/'); 
}); 

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server is running");
});