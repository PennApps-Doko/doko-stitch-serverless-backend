function log(...args) {
  console.log(...args.map(d => JSON.stringify(d)));
}

function buildArea(coords, range) {
  let res = {};
  for (let name of ['lat', 'lon']) {
    res[`location.${name}`] = {
      "$gte": coords[name] - range,
      "$lte": coords[name] + range
    };
  }
  return res;
}

function getDistance(coords1, coords2) {
  return 1000 * Math.sqrt(Math.pow((coords1.lat - coords2.lat) * 110.57, 2) + Math.pow((coords1.lon - coords2.lon) * 111.32, 2));
}

exports = async function(lat, lon, range) {
  
  arg = { lat, lon };
  range = parseFloat(range) || 0.01;
  if (!arg || !arg.lon || !arg.lat) return null;
  
  const mdb = context.services.get("mongodb-atlas");
  const postCollection = mdb.db("doko").collection("Posts");
  const area = buildArea(arg, range);
  // let docs = await postCollection.find(area).limit(20).toArray();
  const docs = await postCollection.find(area).toArray();
  
  return docs
  console.log(docs)
  
  return docs.map(d => ({
    "id": d.id,
    "location": d.location,
    "distance": getDistance(arg, d.location),
    "userId": d.userId,
    "spotId": d.spotId,
    "collectId": d.collectId
  }));
  
};