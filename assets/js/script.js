$(".dropdown-menu").on("click", function teamSearch(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://www.balldontlie.io/api/v1/teams/", requestOptions)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (result) {
            let teamData = Object.values(result)
            let teamNames = Object.values(teamData[teamData.length-2])
            console.log(teamNames)
            console.log(teamData[teamData.length-2])
            console.log(result)
        })
        .catch(function (error) {console.log('error', error)    
    });
})

// here I created an event listener for the search button. When the search button is clicked on we run the event searchPlayer
$("#search-submit").on("click", function searchPlayer(){

    //I then use the search URL to search for the player name
    var searchURL = "https://www.balldontlie.io/api/v1/players?search="
    
    //I then akes the users input and put it into a variable
    var playerName = $("#search-entry").val()
    // var searchEntryString = [playerName]

    let requestUserParam = jQuery.param({ name: playerName.trim() })
    console.log(requestUserParam)
    //then append the users input to the url
    let requestURL = searchURL + requestUserParam;
    console.log(requestURL)
    // save to local storage so next page can load data?

    //and fetch the information
    fetch(requestURL)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
         //move page to other index page?
})


// This function dynamically displays information onto our cards
function cardFront(){

    var cards = document.querySelectorAll('.card-body');  // this is what we will append scheduled games to in the for loop below
    console.log(cards);
   
    for(i=0; i<6; i++){

        var dayCard = moment().add(i, 'days').format('l');  // gives us next 5 days
        console.log(dayCard);
        
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




// practice object to simulate the function we will need
var player = [

    {
        number : 77,
        firstName : 'Luca',
        lastName : 'Doncic',
        stats : {
            games : 50,
            pos : 'PG',
            points : 33,
            fG : 12,
            fGperc : 34,
            threePtPerc : 28,
            reb : 9,
            ast : 12,
            to : 3,
            pf : 3,
        }
    },

    {
        number : 44,
        firstName : 'Davis',
        lastName : 'Bertanas',
        stats : {
            games : 43,
            pos : 'F',
            points : 26,
            fG : 9,
            fGperc : 32,
            threePtPerc : 25,
            reb : 10,
            ast : 4,
            to : 2,
            pf : 4,
        }
    }
]


console.log(player);
console.log(player[0].stats.points);
console.log(player[1].stats.games);

bigTable = document.getElementById('table')
tableBody = document.getElementById('table-body')

console.log(bigTable);
console.log(tableBody);



function teamStats(){

    for( i=0; i<player.length; i++ ){

        var tableRow = document.createElement('tr')

        var num = document.createElement('th');
        num.textContent = player[i].number;

        var first = document.createElement('td');
        first.textContent = player[i].firstName;

        var last = document.createElement('td');
        last.textContent = player[i].lastName

        var position = document.createElement('td');
        position.textContent = player[i].stats.pos;
       
        var gp = document.createElement('td');
        gp.textContent = player[i].stats.games;

        var pointsScored = document.createElement('td');
        pointsScored.textContent = player[i].stats.points;

        var fGoal = document.createElement('td');
        fGoal.textContent = player[i].stats.fG;

        var fGoalPerc = document.createElement('td');
        fGoalPerc.textContent = player[i].stats.fGperc;

        var threePerc = document.createElement('td');
        threePerc.textContent = player[i].stats.threePtPerc

        var rebound = document.createElement('td');
        rebound.textContent = player[i].stats.reb;

        var assist = document.createElement('td');
        assist.textContent = player[i].stats.ast;

        var tOver = document.createElement('td');
        tOver.textContent = player[i].stats.to;

        var pFoul = document.createElement('td');
        pFoul.textContent = player[i].stats.pf;

        tableBody.appendChild(tableRow); // appends each row to the body
        tableRow.append(num, first, last, position, gp, pointsScored, fGoal, fGoalPerc, threePerc, rebound, assist, tOver, pFoul);

    }

        table.appendChild(tableBody); //appends body to the main table div
}


teamStats()
