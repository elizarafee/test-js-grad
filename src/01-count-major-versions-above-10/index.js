/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

 const axios = require('axios');


 
 
module.exports = async function countMajorVersionsAbove10() {  
  const count = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
  "url": "https://api.npms.io/v2/search/suggestions?q=react",
  "method": "GET",
  "return_payload": true
})
.then((response) => {
  var arr = response.data.content;
  var array_len = arr.length;
  var count = 0;
  for(var i=0; i<array_len; i++){
    // parseFloat() method parsed the package version and will return it as a floating point number
    var version = parseFloat(arr[i].package.version);
    var least_version = 10.0;
    // Checking the version is greater than 10.x.x or not
    if( version > least_version){
      // Tracking the total number of packages of above 10.x.x version
      count++;
    }
  }
  
  return count;
}, (error) => {
  console.log(error);
});

return count;
};
