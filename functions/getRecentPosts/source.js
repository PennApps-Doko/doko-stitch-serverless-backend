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
  
  let postCollection = context.services.get("mongodb-atlas").db("doko").collection("Posts");
  let docs = await postCollection.find(buildArea(arg, range)).toArray();
  let res = docs.map(d => ({
    "id": d.id,
    "distance": getDistance(arg, d.location),
    "location": d.location,
    "spotId": d.spotId
  }));
  
  log(res);
  return res;
  
};