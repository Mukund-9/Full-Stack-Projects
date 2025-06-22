require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns=require('dns');
const urlParser = require('url');

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
// Basic Configuration
const port = process.env.PORT || 3000;
const urlSchema= mongoose.Schema({
  original_url:String,
  short_url:Number
});
const url=new mongoose.model("url",urlSchema);
app.use(express.urlencoded({ extended: false }));
let counter=1;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',async(req,res)=>{
  const originalUrl= req.body.url;
  let hostname;
  try {
    hostname = new URL(originalUrl).hostname;
  } catch {
    return res.json({ error: 'invalid url' });
  }
  dns.lookup(hostname,async(err)=>{
    if (err) return res.json({ error: 'invalid url' });
    let existing= await url.findOne({original_url : originalUrl});
    if(existing) return res.json(existing);
    const newUrl=new url({original_url : originalUrl,short_url: counter});
    counter++;
    await newUrl.save();
    res.json(newUrl);
  });
});
app.get('/api/shorturl/:short',async(req,res)=>{
  const urlEntry=await url.findOne({short_url : Number(req.params.short)});
  if(!urlEntry) return res.json({error : 'No short URL found'});
  res.redirect(urlEntry.original_url);
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
