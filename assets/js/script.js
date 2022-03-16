
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://www.balldontlie.io/api/v1/teams", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));