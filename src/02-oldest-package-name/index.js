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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

 const axios = require('axios');


module.exports = async function oldestPackageName() {
  // TODO
  const name = await  axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  })
  .then((response) => {
    var arr = response.data.content;
    var array_len = arr.length;
    var arr_min;
    // For loop for sorting the array in ascending order by date
    for(var i=0; i<array_len; i++){
      for(var j=0; j<array_len; j++){
        if(arr[i].package.date<arr[j].package.date){
          arr_min = arr[j];
          arr[j] = arr[i];
          arr[i] = arr_min;
        }
      }
    }
    // The package that has the oldest date value is the first data of the sorted array
    var result = arr[0];
    return result.package.name;
  }, (error) => {
    console.log(error);
  });

  return name
};
