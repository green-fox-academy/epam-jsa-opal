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
          pushIntoLikeStatusField(votetype,db,videosId,userId,VideoObject,res,commentId);
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

function pushIntoLikeStatusField(votetype,db,videosId,userId,VideoObject,res,commentId){
  let tempArray = VideoObject.commentInfos[commentId-1].LikeStatus;
  if(votetype === 'likeenable'){
    let objInsert = {
      "userId" : userId.toString(),
      "liked" : true,
      "disliked" : false
    }
    tempArray.push(objInsert);
    VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
    db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
  }
  else if(votetype === 'dislikeenable'){
    let objInsert = {
      "userId" : userId.toString(),
      "liked" : false,
      "disliked" : true
    }
    tempArray.push(objInsert);//tempArray is Likestatus array
    VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
    db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
  }
  else if(votetype === 'likedisable'){
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        tempArray[i].liked = false;
        break;
      }
    }
    VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
    db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
  }else if(votetype === 'dislikedisable'){
    for(let i = 0 ; i < tempArray.length ; i++){
      if(tempArray[i].userId === userId.toString()){
        tempArray[i].disliked = false;
        break;
      }
    }
    VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
    db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
  }
  let sendobj = CountLikeAndDislikedNumber(tempArray);
  res.setHeader('content-type', 'application/json');
  res.status(200).send(sendobj);
  db.close();
}

// function enableOrDisable(db,videosId,userId,VideoObject,tempArray,liked,disliked){
//   let objInsert = {
//     "userId" : userId,
//     "liked" : true,
//     "disliked" : false
//   }
//   tempArray.push(objInsert);
//   VideoObject.commentInfos[commentId-1].LikeStatus = tempArray;
//   db.collection('videos').update({'videoId': videosId }, {$set: {'commentInfos':  VideoObject.commentInfos}} );
// }

module.exports = {updateComments: update};