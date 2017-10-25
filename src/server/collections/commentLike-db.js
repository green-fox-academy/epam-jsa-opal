'use strict';
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let username = process.env.Username;
let password = process.env.Password;
let url;
if (password !== undefined) {
  url = protocol + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
} else {
  url = protocol + '://' + host + ':' + port + '/' + name;
}
function update(videosId,commentId,votetype,res,req) {
  let number;
  let userId;
  MongoClient.connect(url, (err, db) => {
    db.collection('videos').find({'videoId' :videosId}).toArray(function(err,items){   
      if (err) {
        console.log('Unable to connect to the MongoDB server. Error:', err);
        res.status(404).send();
        db.close();
      }    
      let VideoObject = items[0];
      let token = req.get('Authorization');
      db.collection('tokenDescriptors').find({'token' : token}).toArray(function(err,items){
        if (err) {
          console.log('Unable to connect to the MongoDB server. Error:', err);
          res.status(404).send();
          db.close();
          return;
        }    
        if(items[0] === undefined){
          console.log('Not login', err);
          res.status(404).send({'error':'Not login sorry!'});
          db.close();
          return;
        }
        else {
          userId = items[0].userId;
          commentLikeCallHandler(votetype,db,videosId,userId,VideoObject,res,commentId);
        }
      });
    });  
  });
}

function CountLikeAndDislikedNumber(commentUserArray){
  let likednumber = 0;
  let dislikednumber = 0;
  commentUserArray.forEach(function(element) {
    if(element.liked === true){
      likednumber++;
    }
    if(element.disliked=== true){
      dislikednumber++;
    }
  });
  let result = {
    'likedNumber': likednumber,
    'dislikedNumber': dislikednumber,
  }
  return result;
}

function commentLikeCallHandler(votetype,db,videosId,userId,VideoObject,res,commentId){
  let tempArray = VideoObject.commentInfos[commentId-1].LikeStatus;
  if(votetype === 'likeenable'){
    let whetherFind = false;
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        whetherFind = true;
        tempArray[i].liked = true;
        break;
      }
    }
    if(!whetherFind){
      createObj(true,false,tempArray)
    }
    updateCommentsInfo(VideoObject,commentId,tempArray,db,videosId);
  }
  else if(votetype === 'dislikeenable'){
    let whetherFind = false;
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        whetherFind = true;
        tempArray[i].disliked = true;
      }
    }
    if(!whetherFind){
      createObj(false,true,tempArray)
    }
    updateCommentsInfo(VideoObject,commentId,tempArray,db,videosId);
  }
  else if(votetype === 'likedisable'){
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        tempArray[i].liked = false;
        break;
      }
    }
    updateCommentsInfo(VideoObject,commentId,tempArray,db,videosId);
  }else if(votetype === 'dislikedisable'){
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        tempArray[i].disliked = false;
        break;
      }
    }
    updateCommentsInfo(VideoObject,commentId,tempArray,db,videosId);
  }
  let sendobj = CountLikeAndDislikedNumber(tempArray);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(sendobj);
  db.close();
}

function updateCommentsInfo(VideoObject,commentId,tempArray,db,videosId){
  VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
  db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
}

function createObj(like,dislike,tempArray){
  let objInsert = {
    "userId" : userId.toString(),
    "liked" : like,
    "disliked" : dislike,
  }
  tempArray.push(objInsert);
}

module.exports = {updateComments: update};