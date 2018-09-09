// Try running in the console below.
  
exports = function(payload) {
  
  let {lat, lon, range} = payload.query;
  
  lat = parseFloat(lat);
  lon = parseFloat(lon);
  range = parseFloat(range) || 0.01;
  
  if (!lat || !lon) return null;
  return context.functions.execute("getRecentPosts", lat, lon, range);//.then(data => JSON.stringify(data) );
  
};