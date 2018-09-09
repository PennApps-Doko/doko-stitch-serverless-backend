// Try running in the console below.
  
exports = function(payload) {
  
  let {id} = payload.query;
  
  if (!id) return null;
  return context.functions.execute("getRestaurant", id);//.then(data => JSON.stringify(data) );
  
};