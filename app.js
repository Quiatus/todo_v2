const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/date.js');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/todoDB');

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: 'todo list'
});

const item2 = new Item({
    name: 'Press + to add items'
});

const item3 = new Item({
    name: 'Click checkbox to remove'
});

const defaultItems = [item1, item2, item3];


app.get("/", function(req,res){
    let day = date.getDate();

    Item.find({}, function(err, foundItems){

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log('Success');
                }
            });
            res.redirect('/');
        } else {
            res.render('list',{listTitle: day, newListItem: foundItems});
        }
    })
});

app.get("/work", function(req,res){
    res.render('list',{listTitle: 'Work List', newListItem: workItems});
});

app.get('/about',function(req,res){
    res.render('about');
})

app.post('/', function(req,res){
    let item = req.body.addItem;

    if (req.body.list === 'Work List') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
})

app.listen(3000, function(){
    console.log('Server started on port 3000');
});