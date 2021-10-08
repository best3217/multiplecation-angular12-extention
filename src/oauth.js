window.onload = function() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    console.log(token)
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    fetch(
        'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyAiRzb4pqkJsM5FrVHL-H_edIzdlS09hK4',
        init)
        .then((response) => response.json())
        .then(function(data) {
          console.log(data)
        });
  });
}