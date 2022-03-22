// let apiKey = "key=b6621a5a4f174d1fa154420458cf0a07"
// Note to self, we need to change the URL's in the 300 range because the API key is hardcoded into the URL. This technically isn't an issue so may not even be that important
let teamAbbr = "";
let conferencePg2 = "";
let divisionPg2 = "";
let teamSpecific = "";
let cards = document.querySelectorAll('.card-body');

$(".dropdown-item").on("click", function teamSearch(){
    // This console.log gives us a numerical value that will correspond with an NBA teams ID
    let nbaId = $(this).attr("data-nba-id");
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let teamFetchUrl = "https://www.balldontlie.io/api/v1/teams/";
    let appendedTeamFetchUrl = teamFetchUrl + nbaId;
    
    fetch(appendedTeamFetchUrl, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            let teamData = Object.values(result);
            
            teamAbbr3 = teamData[1];
            conferencePg2 = teamData[3];
            divisionPg2 = teamData[4];
            teamSpecific = teamData[5];

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
                
                // Set variables equal to the following stats so we can append them when searching for a player?
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

                
                var playerStatDiv = document.getElementById('playerTable1')
                var tablePg1 = document.createElement('table') //create table
                tablePg1.classList.add('table')
                var tableHead = document.createElement('thead') //creates head for the table
                var tableRowHead = document.createElement('tr')
                
                var cat1 = document.createElement('th') //creates categories
                cat1.setAttribute('scope', 'col')
                cat1.textContent = 'Name' //text for player becomes user input (figure out capitalization)
                var cat2 = document.createElement('th')
                cat2.setAttribute('scope', 'col')
                cat2.textContent = 'Games'
                var cat3 = document.createElement('th')
                cat3.setAttribute('scope', 'col')
                cat3.textContent = 'Points'
                var cat4 = document.createElement('th')
                cat4.setAttribute('scope', 'col')
                cat4.textContent = 'Ast'
                var cat5 = document.createElement('th')
                cat5.setAttribute('scope', 'col')
                cat5.textContent = 'Reb'
                var cat6 = document.createElement('th')
                cat6.setAttribute('scope', 'col')
                cat6.textContent = 'Stl'
                var cat7 = document.createElement('th')
                cat7.setAttribute('scope', 'col')
                cat7.textContent = 'FG %'
                var cat8 = document.createElement('th')
                cat8.setAttribute('scope', 'col')
                cat8.textContent = '3 PT %'
                var cat9 = document.createElement('th')
                cat9.setAttribute('scope', 'col')
                cat9.textContent = 'FT %'
                var cat10 = document.createElement('th')
                cat10.setAttribute('scope', 'col')
                cat10.textContent = 'TO'
                var cat11 = document.createElement('th')
                cat1.setAttribute('scope', 'col')
                cat11.textContent = 'PF'
                
                var tablePg1Body = document.createElement('tbody')
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

                //append table to div
                playerStatDiv.append(tablePg1)
                //append table head to table
                tablePg1.append(tableHead)
                // append tablerow to tablehead
                tableHead.append(tableRowHead)
                //append content to tablerow
                tableRowHead.append(cat1,cat2,cat3,cat4,cat5,cat6,cat7,cat8,cat9,cat10,cat11)
                //append tablebody to table
                tablePg1.append(tablePg1Body)
                //append tablerow to tablebody
                tablePg1Body.append(row2)
                //append data to table row
                row2.append(dataName,dataGame,dataPoints,dataAst,dataReb,dataStl,dataFgPerc,dataThreePerc,dataFtPerc,dataTo,dataPf)

        })
    })
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
    function getDays(){
        // This function will get the current day
        // Use that current day in a loop that will iterate and grab the next five days
        // Push the six values into an empty array
    }

    function getSchedule(){
        // This function will call the array from the previous function
        // It will then format the dates into a month-day-year format
        // Then it will send a fetch request with the formatted date appended to the URL
        // Finally, it will grab specific data from the fetch and display it on the cards that are on the webpage
    }
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

// For each date we're going to make an API request to get the NBA game for specific day
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

// //This is a test for loop, I tried to get these cards to display in a for loop, but kept throwing error on the appendChild line. We may want to see if we can get it to work in the loop. But it works great like it is.

// for (i=0; i<cards.length;i++){
//     // For each date we're going to make an API request to get the NBA game for specific day
//     // console.log("Date: " + formatDate(dates[i]));
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(dates[i]) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             // console.log(entry.AwayTeam);
//             // console.log(entry.HomeTeam);
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             // console.log(entry);
//             // console.log(cards[0])
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards.appendChild(test)
//         });
//     });
// }

// // dates.forEach(function (date) {
// //     // For each date we're going to make an API request to get the NBA games during that day.
// //     // console.log("Date: " + formatDate(i));
// //     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(date) + '?key=c55e28baecdc43b59a80d237643bde43')
// //         .then(function (response) {
// //             return response.json();
// //         })
// //         .then(function (result) {
// //             // Updates the code
// //         result.forEach(function (entry) {
// //             //console.log(entry.AwayTeam);
// //             //console.log(entry.HomeTeam);
// //             // console.log(entry);
// //             // console.log(entry.AwayTeam)
// //             let schedule = Object.values(entry);
// //             // console.log(schedule)
// //             // console.log(schedule[6])
// //             // console.log(schedule[7])
// //             // console.log(day1)
// //         });
// //     });
// // });
  
  
// // gets data of teams standings
// //    function teams(){
// //     fetch("https://api.sportsdata.io/v3/nba/scores/json/Standings/2022?key=c55e28baecdc43b59a80d237643bde43")
// //     .then(response => response.json())
// //     .then(result => console.log(result))
// //     .catch(error => console.log('error', error));
// //      document.getElementById("p2").innerText += entry.AwayTeam + " vs. " + entry.HomeTeam + "\n\n";
// //   }
  
// //   teams();
  
  
//   //gets each player on a team
// //   function players_by_team(){
// //     fetch("https://api.sportsdata.io/v3/nba/scores/json/Players/DAL?key=c55e28baecdc43b59a80d237643bde43")
// //     .then(response => response.json())
// //     .then(result => console.log(result))
// //     .catch(error => console.log('error', error));
  
// //   }
  
// //   players_by_team();
  
// //   // gets player data by player ID which we get from the player_by_team function
// //   function player_stat(){
// //     fetch("https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2022?key=c55e28baecdc43b59a80d237643bde43")
// //     .then(response => response.json())
// //     .then(result => console.log(result))
// //     .catch(error => console.log('error', error));
  
// //   }
  
// //   player_stat();