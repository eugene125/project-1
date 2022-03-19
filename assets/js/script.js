// The following event listener will fetch information on NBA teams
$(".dropdown-item").on("click", function teamSearch(){
    // This console.log gives us a numerical value that will correspond with an NBA teams ID
    console.log( $(this).attr("data-nba-id") );
    var nbaId = $(this).attr("data-nba-id");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var url = "https://www.balldontlie.io/api/v1/teams/";
    // The nbaId variable being appended is a numerical value. While this is not the best practice, the number being appended doesn't seem to need to be stringified
    var newUrl = url + nbaId
    
    fetch(newUrl, requestOptions)
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            // The teamData variable gives an object with information regarding the NBA team
            let teamData = result
        })
        .catch(function (error) {console.log('error', error)    
    });
})


// Figure out how to filter for specific players on the team that I searched for
// Grab those ids, append them to a URL to gather the data on that player
// Append those player stats onto page 2

// here I created an event listener for the search button. When the search button is clicked on we run the event searchPlayer
$("#search-submit").on("click", function searchPlayer(event){
    event.preventDefault();
    //I then use the search URL to search for the player name
    var searchURL = "https://www.balldontlie.io/api/v1/players?search"
    
    //I then akes the users input and put it into a variable
    var playerName = $("#search-entry").val()
    // var searchEntryString = [playerName]

    let requestUserParam = jQuery.param({ "": playerName})
    console.log(requestUserParam)
    //then append the users input to the url
    let requestURL = searchURL + requestUserParam;
    console.log(requestURL)
    // save to local storage so next page can load data?

    //and fetch the information
    fetch(requestURL)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
         //move page to other index page?


    // Filter for the player's ID
    // set a variable for the player ID
    // Append the player's ID
    var playerUrl = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]"

    let playerSearch = jQuery.param({ "": player_ids})
    console.log(playerSearch)
    let playerSearchUrl = playerUrl + playerSearch;

    fetch(playerSearchUrl)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})



// This function dynamically displays information onto our cards
function cardFront(){

    var cards = document.querySelectorAll('.card-body');  // this is what we will append scheduled games to in the for loop below
    console.log(cards);
   
    for(i=0; i<cards.length; i++){

        var dayCard = moment().add(i, 'days').format('l');  // gives us next 5 days
        
        var cardDate = document.createElement('h5');   // header
        cardDate.classList.add('card-title');
        cardDate.textContent = dayCard;

        var cardUl = document.createElement('ul');  // ul (can add class for styling)
        cardUl.classList.add('left')

        var cardList1 = document.createElement('li');   // will be a scheduled game for that day
        cardList1.classList.add('card-text')
        cardList1.textContent = 'This is a test';

        cards[i].appendChild(cardDate);    //everything is appended
        cards[i].appendChild(cardUl);
        cardUl.appendChild(cardList1);

    }
}

cardFront()