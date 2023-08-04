const unirest = require("unirest");


exports.location = async(req,res,next) => {

   await unirest(
        "GET",
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
      );
      apiCall.headers({
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "x-rapidapi-key": "df39a10df1msh897a8ea144f7dc2p1b5d87jsn991da73633c9",
      });
      apiCall.end(function (result) {
        if (res.error) throw new Error(result.error);
        // console.log(result.body);
        // console.log(result.body.longitude)
    req.body = result.body
    next()
        // res.send(result.body);
      });
}
