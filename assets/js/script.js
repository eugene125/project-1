// let apiKey = "key=b6621a5a4f174d1fa154420458cf0a07"
// Note to self, we need to change the URL's in the 300 range because the API key is hardcoded into the URL. This technically isn't an issue so may not even be that important
let teamAbbr = "";
let conferencePg2 = "";
let divisionPg2 = "";
let teamSpecific = "";
let cards = document.querySelectorAll('.card-body');
var button1 = document.getElementById('reset')

$(".dropdown-item").on("click", function teamSearch(){
    // This console.log gives us a numerical value that will correspond with an NBA teams ID
    let nbaId = $(this).attr("data-nba-id");
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    //We then set the variables for the new URL
    let teamFetchUrl = "https://www.balldontlie.io/api/v1/teams/";
    let appendedTeamFetchUrl = teamFetchUrl + nbaId;
    
    //and put the New URL into our code to fetch
    fetch(appendedTeamFetchUrl, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            let teamData = Object.values(result);
            
            //Here we are setting the data values that we will need for our second HTML page
            teamAbbr3 = teamData[1];
            conferencePg2 = teamData[3];
            divisionPg2 = teamData[4];
            teamSpecific = teamData[5];

            //We are putting that data in the URL so that it is easy to call on later.
            location.assign('./page2.html?q='+teamSpecific+'&con2='+conferencePg2+'&div2='+divisionPg2+'&teamAbbr3='+teamAbbr3);
            // // teamHeader(teamSpecific, conferencePg2, divisionPg2);    
        })        
        .catch(function (error) {console.log('error', error);  
    });
})

// When a player name is submitted into the search bar, an event listener triggers a function to search for any player that has the specified name.
$("#search-submit").on("click", function searchPlayer(event){
    event.preventDefault();
    let playerSearchUrl = "https://www.balldontlie.io/api/v1/players?search";
    let playerName = $("#search-entry").val().toUpperCase();
    let userParam = jQuery.param({ "": playerName});
    let playerSearchFetchUrl = playerSearchUrl + userParam;
    console.log(playerName);

    //Here I created a function to save the user input to local storage.
    function saveData(){
        localStorage.setItem("userInputofPlayerName", playerName)
    }
    saveData()

    fetch(playerSearchFetchUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            let playerData = Object.values(result);
            // Filter for the player's ID and set it to a variable
            let player_ids = playerData[0][0].id
            
            // Append the player's ID to the url
            let playerAveragesUrl = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]"
            let playerAveragesParam = jQuery.param({ "": player_ids})
            let playerAveragesFetchUrl = playerAveragesUrl + playerAveragesParam;
            // console.log(playerAveragesFetchUrl)

            fetch(playerAveragesFetchUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (result) {
                let playerStats = Object.values(result);
                
                // Set variables equal to the following stats so we can append them when searching for a player
                console.log(playerStats);

                var gamesPlayer = playerStats[0][0].games_played;
                var pointsPlayer = playerStats[0][0].pts;
                var astPlayer = playerStats[0][0].ast;
                var rebPlayer = playerStats[0][0].reb;
                var stlPlayer = playerStats[0][0].stl;
                var fgPercPlayer = playerStats[0][0].fg_pct;
                var threePercPlayer = playerStats[0][0].fg3_pct;
                var ftPercPlayer = playerStats[0][0].ft_pct;
                var toPlayer = playerStats[0][0].turnover;
                var pfPlayer = playerStats[0][0].pf;

                

                var tableTable = document.getElementById('tablePg1')
                var tBody = document.getElementById('table-bodyPg1')  //new
                
                // var tablePg1Body = document.createElement('tbody')
                var row2 = document.createElement('tr')
                var dataName = document.createElement('td')
                dataName.textContent = playerName
                var dataGame = document.createElement('td')
                dataGame.textContent = gamesPlayer
                var dataPoints = document.createElement('td')
                dataPoints.textContent = pointsPlayer
                var dataAst = document.createElement('td')
                dataAst.textContent = astPlayer
                var dataReb = document.createElement('td')
                dataReb.textContent = rebPlayer
                var dataStl = document.createElement('td')
                dataStl.textContent = stlPlayer
                var dataFgPerc = document.createElement('td')
                dataFgPerc.textContent = fgPercPlayer
                var dataThreePerc = document.createElement('td')
                dataThreePerc.textContent = threePercPlayer
                var dataFtPerc = document.createElement('td')
                dataFtPerc.textContent = ftPercPlayer
                var dataTo = document.createElement('td')
                dataTo.textContent = toPlayer
                var dataPf = document.createElement('td')
                dataPf.textContent = pfPlayer

              
                row2.getAttribute('scope', 'row')
                tBody.appendChild(row2) //new
                row2.append(dataName,dataGame,dataPoints,dataAst,dataReb,dataStl,dataFgPerc,dataThreePerc,dataFtPerc,dataTo,dataPf) //new
                tableTable.classList.remove('hide')


                button1.classList.add('show') //reset button appears

        })
    })
})

$('#reset').on('click', function(event){
    document.getElementById('tablePg1').textContent = ''  // removes stats table
    button1.classList.remove('show')
})


// This function dynamically displays information onto our cards
function cardFront(){  
    for(i=0; i<cards.length; i++){
        
        // gives us next 5 days
        let dayCard = moment().add(i, 'days').format('l');
        
        // Create a header tag
        let cardDate = document.createElement('h3');
        cardDate.classList.add('card-title', 'center');
        cardDate.textContent = dayCard;

        //date is appended
        cards[i].appendChild(cardDate);
    }
}
cardFront()

// Game Schedules 
// Everything below this line needs a lot of refactoring to condense multiple functions into a single function

function formCalendar(){
    function getDays() {
        let now = moment().format("YYYY-MMM-DD")
        console.log(now);
        let daysArr = [now, ];
        for (i=1; i<6; i++){
            let nextDay = moment(now, "YYYY-MMM-DD").add(i, "days")
            daysArr.push(nextDay.format("YYYY-MMM-DD"))
        }
        console.log(daysArr)
    } getDays()


}

function getNextDay(date) {
    let nextDay = new Date(date);
    console.log(nextDay);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
}

// // This function reformats the date that the API recognizes
function formatDate(date) {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return year + "-" + monthNames[month] + "-" + (day);
}
  
// The 6 days we have to get the date for
let day1 = new Date();
let day2 = getNextDay(day1);
let day3 = getNextDay(day2);
let day4 = getNextDay(day3);
let day5 = getNextDay(day4);
let day6 = getNextDay(day5);

// Create a list of the days
let dates = [day1,day2,day3,day4,day5,day6]  
// console.log(dates);

// // For each date we're going to make an API request to get the NBA game for specific day
function only1day (day1) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day1) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[0].appendChild(test)
        });
    });
}
only1day(day1);

function only2day (day2) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day2) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[1].appendChild(test)
        });
    });
}
only2day(day2);

function only3day(day3) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day3) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[2].appendChild(test)
        });
    });
}
only3day(day3);

function only4day (day4) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day4) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[3].appendChild(test)
        });
    });
}
only4day(day4);

function only5day (day5) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day5) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[4].appendChild(test)
        });
    });
}
only5day(day5);

function only6day (day6) {
    fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day6) + '?key=c55e28baecdc43b59a80d237643bde43')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        // Udates the code
        data.forEach(function (entry) {
            let away = entry.AwayTeam
            let home = entry.HomeTeam
            let test = document.createElement('p')
            test.classList.add('center')
            test.innerHTML = `${away} vs ${home}`
            cards[5].appendChild(test)
        });
    });
}
only6day(day6);
