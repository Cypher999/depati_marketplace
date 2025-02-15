const bcrypt=require('bcrypt');
const saltRounds=10;

let hash=function(plainText){
  return new Promise((resolve,reject)=>{
    bcrypt.hash(plainText, saltRounds, function (err, hash) {
      if(err){return reject(err)}
      return resolve(hash);
    });
  })
}

let verify=function(plaintext,hash){
  return new Promise((resolve,reject)=>{
    bcrypt.compare(plaintext, hash, function (err, result) {
      if(err){return reject(err)}
      return resolve(result);
    });
  })
}

module.exports={hash,verify}