exports = function(arg){
  let { fullDocument } = arg;
  if (!fullDocument || !fullDocument.spotId) return null;
  
  let spotCollection = context.services.get("mongodb-atlas").db("doko").collection("Spots");
  return spotCollection.updateOne({"id": fullDocument.spotId}, {"$inc": {postCount: 1}});
  
};