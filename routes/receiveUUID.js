//Import the necessary libraries/declare the necessary objects
 var express = require("express");
 var app = express();

 var bodyParser = require('body-parser');

var myLocalData = ["00000000-0000-0000-0000-000000000000","00000000-0000-0000-0000-000000000001"];
var myRecData=[]
var flagCheck=0

console.log(myLocalData.length)
module.exports = function(app) {
 // app.use(bodyParser.json());

 app.use(express.json())
 app.post("/receiveUUID", function (request, response) {
  // response.setHeader("Content-Type", "application/json");

  // console.log(jsonParser(request.body))

  myRecData=jsonParser(request.body)
  console.log(myRecData)

  if (myLocalData.length === myRecData.length && myLocalData.every(function(u, i) {
       return u === myRecData[i];
      })
  ) {
   response.status(200).send({
    "restaurants": [
     {
      "INFO": {
       "ID": "1",
       "Address": "IRAN - Tehran - Pasdaran Street",
       "Name": "Black Food",
       "Category": "1",
       "Img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
      }
     },
     {
      "INFO": {
       "ID": "2",
       "Address": "IRAN - Tehran - Heravi SQ",
       "Name": "Shandiz Heravi Center",
       "Category": "1",
       "Img": "https://images.kojaro.com/2019/5/f2b0a353-96c3-45f0-8c9e-abfe37b194ba.jpg"
      }
     }
    ]
   })
  } else {

   for (var i = 0; i<myLocalData.length; i++) {
   for (var j = 0; j< myRecData.length; j++) {
    if (myLocalData[i] === myRecData[j])
    {
     flagCheck=1
     switch (myRecData[j]) {
      case "00000000-0000-0000-0000-000000000000":
       response.status(200).send(
           {
            "restaurants": [
             {
              "INFO": {
               "ID": "1",
               "Address": "IRAN - Tehran - Pasdaran Street",
               "Name": "Black Food",
               "Category": "1",
               "Img": "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
              }
             }]
           }
       );
       break;

      case "00000000-0000-0000-0000-000000000001":
       response.status(200).send(
           {
            "restaurants": [
             {
              "INFO": {
               "ID": "2",
               "Address": "IRAN - Tehran - Heravi SQ",
               "Name": "Shandiz Heravi Center",
               "Category": "1",
               "Img": "https://images.kojaro.com/2019/5/f2b0a353-96c3-45f0-8c9e-abfe37b194ba.jpg"
              }
             }]
           }
       );
       break;
     }
   }

    }
   }
   if(flagCheck===0){
    response.status(200).send({});
   }
  }
 });



//Start the server and make it listen for connections on port 8080

}

function jsonParser(stringValue) {

 var string = JSON.stringify(stringValue);
 var objectValue = JSON.parse(string);
 return objectValue['uuids'];
}