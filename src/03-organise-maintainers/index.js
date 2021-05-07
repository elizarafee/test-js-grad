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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const axios = require('axios');


module.exports = async function organiseMaintainers() {
const maintainers = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
  "url": "https://api.npms.io/v2/search/suggestions?q=react",
  "method": "GET",
  "return_payload": true
})
.then((response) => {
  var arr = response.data.content;
  var array_len = arr.length;

  var maintainers = [];

  // This loop is for inserting all of the maintainers available in maintainers array
  for(var i=0; i<array_len; i++){
    package_maintainers = arr[i].package.maintainers
    maintainers_length = package_maintainers.length
    for(var j=0; j<maintainers_length; j++){
      // This condition is for preventing to insert one maintainers name multiple times in the array
      if(!maintainers.includes(arr[i].package.maintainers[j].username)){
        maintainers.push(arr[i].package.maintainers[j].username)
      }
    }
  }
  
  // Sorting maintainers name in alphabetical order.
  maintainers.sort();
  
  var maintainers_array_length = maintainers.length;

  // It will hold the result of maintainers with the packages they maintain
  var results = [];

  for(var i=0; i<maintainers_array_length; i++){
    let packages = [];
      for(var j=0; j<array_len; j++){  
        package_maintainers = arr[j].package.maintainers
        maintainers_length = package_maintainers.length
        // This loop is for traversing each of the maintainers of particular packages
        for(var k=0; k<maintainers_length; k++){
          if(arr[j].package.maintainers[k].username.includes(maintainers[i])){
            packages.push(arr[j].package.name);
          }
        }
      }
      // Tracking the maintainer name with all of the package's names they maintain
      const result_item = {
        username: maintainers[i],
        packageNames: packages.sort()
      }
      results.push(result_item);
    }
    return results;
}, (error) => {
  console.log(error);
});

  return maintainers
};
