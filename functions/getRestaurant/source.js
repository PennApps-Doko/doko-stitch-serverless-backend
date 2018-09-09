exports = function(postId){
  
  let postCollection = context.services.get("mongodb-atlas").db("doko").collection("Posts");
  let spotCollection = context.services.get("mongodb-atlas").db("doko").collection("Spots");
  let restCollection = context.services.get("mongodb-atlas").db("doko").collection("Restaurants");
  
  return postCollection.findOne({"id": postId}).then(post => {
    
    if (!post || !post.spotId) return new Promise.resolve(null);
    else delete post._id;
    return spotCollection.findOne({"id": post.spotId}).then(spot => {
      
      if (!spot || !spot.restaurantId) return new Promise.resolve(null);
      else delete spot._id;
      return restCollection.findOne({"id": spot.restaurantId}).then(rest => {
        
        if (!rest || !rest.id) return new Promise.resolve(null);
        else delete rest._id;
        return new Promise.resolve({
          name: spot.name,
          id: spot.id,
          location: spot.location,
          postContent: post.content,
          restaurant: rest
        });
        
      });
      
    });
    
  });
  
};