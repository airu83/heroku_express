const express = require('express');
const app = express();
const port = process.env.PORT? process.env.PORT: 5000;

const routes = require('./routes/user'); // 회원가입, 로그인, 로그아웃
app.use(routes);

const mongoose = require('mongoose');
const config = require('./config/key');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
  origin: true, // Access-Control-Allow-Origin = default true
  credentials: true
}));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => console.log('MongoDB Connected, you can use now!')).catch(err => console.log(err));

app.get('/hello', (req, res) => res.send('Hello Metaso'));

// console.log(__dirname); // D:\project-ind\heroku_express
app.listen(port, () => console.log(`Metaso app listen on port ${port}`));
