require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');;
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
const exerciseSchema=mongoose.Schema({
  username: String,
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  id: String,
  date: String
});
const userSchema=mongoose.Schema({
  username: String
});
const logSchema=mongoose.Schema({
  username: String,
  count: Number,
  id: String,
  log: [{
    description: String,
    duration: Number,
    date: String
  }]
});
const exercise= new mongoose.model("exercise",exerciseSchema);
const user=new mongoose.model("user",userSchema);
const log=new mongoose.model("log",logSchema);

let userName;
let date;
let description;
let duration;
let id;
app.post('/api/users',async (req,res)=>{
  userName=req.body.username;
  try{
    const newUser=new user({username: userName});
    const save=await newUser.save();
    res.json({username: save.username, 
      _id: save._id
    });
  }catch(err){
    res.json({error: 'Failed to create user'});
  }
  
});
app.post('/api/users/:_id/exercises',async (req,res)=>{
  userName=req.body.username;

  id=req.params._id||user.findOne({username:userName})._id;
  description=req.body.description;
  duration=req.body.duration;
  date=req.body.date;
  try {
    const foundUser = await user.findById(id);
    if (!foundUser) return res.status(404).json({ error: 'User not found' });

    const exerciseData = new exercise({
      username: foundUser.username,
      description: description,
      duration: parseInt(duration),
      id: id,
      date: date ? new Date(date).toDateString() : new Date().toDateString()
    });

    const savedExercise = await exerciseData.save();
    res.json({
      _id: id,
      username: foundUser.username,
      date: savedExercise.date,
      duration: savedExercise.duration,
      description: savedExercise.description
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add exercise' });
  }
});
app.get('/api/users', async (req, res) => {
  const users = await user.find({}, '_id username');
  res.json(users);
});

app.get('/api/users/:_id/logs', async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const foundUser = await user.findById(_id);
    if (!foundUser) return res.status(404).json({ error: 'User not found' });

    let query = { id: _id };
    let logs = await exercise.find(query).select('description duration date -_id');

    if (from) {
      const fromDate = new Date(from);
      logs = logs.filter(log => new Date(log.date) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      logs = logs.filter(log => new Date(log.date) <= toDate);
    }
    if (limit) {
      logs = logs.slice(0, parseInt(limit));
    }

    res.json({
      _id: _id,
      username: foundUser.username,
      count: logs.length,
      log: logs
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve logs' });
  }
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
