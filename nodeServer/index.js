var express = require('express')
const fs = require('fs');
var bodyParser = require('body-parser')
const cors = require('cors');



var server = express()
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors());


server.get('/result', function (request, response) {
  response.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  // console.log(request)
  let rawdata = fs.readFileSync('myGame.json');
  let games = JSON.parse(rawdata);
  response.send(games);
})

server.get('/detail/:id', function (request, response) {
  response.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  var gameId = request.params.id


  let rawdata = fs.readFileSync('myGame.json', 'utf-8');
  rawdata = JSON.parse(rawdata)
  var gameDetail = {}


  for (var i = 0; i < rawdata.length; i++) {


    if (rawdata[i].id == gameId) {
      gameDetail = rawdata[i]
      break;
    }
  }

  response.send(gameDetail)
})

server.post('/login', function (request, response) {

console.log(request.query)

  console.log('this is body' + JSON.stringify(request.body.userName))
  console.log('this is body' + request.body.password)
  var userName = request.query.userName
  var passowrd = request.query.password
  let rawdata = fs.readFileSync('userInfo.json', 'utf-8');
  rawdata = JSON.parse(rawdata)
  var result = {
    success: false,
    userName: ''
  }

  for (var i = 0; i < rawdata.length; i++) {
    if (userName == rawdata[i].userName && passowrd == rawdata[i].password) {
      result.success = true;
      result.userName = rawdata[i].userName
      break;
    }
  }
  result = JSON.stringify(result)

  response.send(result)

})

server.listen(3333)
console.log("index start")