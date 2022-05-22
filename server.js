const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Joshua:%40Whatsmyname1991@cluster0.sfayc.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3001, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

 app.post('/upload', (req, res) => {
   
   db.collection('messages').insertOne({ task: req.body.task,isPriority: false}, (err, result) => {
   if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
 })

app.put('/addPriority', (req, res) => {
 
  db.collection('messages')
  .findOneAndUpdate({ task: req.body.task}, {
    $set: {
      isPriority: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({ task: req.body.task}, (err, result) => {
     
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })