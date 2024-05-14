const express = require('express');
const app = express();
const port = 3000;

const path = require('path');  // can run nodemon from parent folder.
const { mainModule } = require('process');
const methodOverride = require('method-override'); // to require methodeoverride

app.set("view engine", "ejs"); // to set ejs files from views directory
app.set("views", path.join(__dirname, "views")); // set views directory to extract ejs files 

app.use(express.urlencoded({extended : true})); // parse post request encoded data
app.use(express.json()); // parse post request json data 

app.use(express.static(path.join(__dirname, "public"))); // middleware to acqiure files from public dir
app.use(methodOverride('_method')); // to use method override.

app.listen(port, (req, res)=>{
    console.log('listening to port : 3000');
});

let posts = [ // Api array of objects
    {
        id : "1a",
        username : "Apnacollege",
        content : "ILoveCoding"
    },
    {
        id : "2b",
        username : "Fawzaan",
        content : "ILoveProgramming"
    },
    {
        id : "2c",
        username : "Fawzaan",
        content : "ILoveCoding"
    }
];

app.get('/posts', (req, res)=>{
    // res.send('Working well');
    res.render("index.ejs", {posts});
});

app.get('/posts/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/posts', (req, res)=>{
    // console.log(req.body);
    let {id, username, content} = req.body; // creating new obj to be pushed in an array.
    posts.push({id, username, content}); // adding data to posts array (push).
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
    res.render("show.ejs", { post});
});


app.get('/posts/:id/edit',(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
    res.render('edit.ejs', {post});
});

app.patch('/posts/:id', (req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id ===p.id);
    post.content = newcontent;
    res.redirect("/posts");
});

app.delete('/posts/:id', (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});