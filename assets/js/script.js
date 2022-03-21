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
            
            teamAbbr = teamData[1];
            conferencePg2 = teamData[3];
            divisionPg2 = teamData[4];
            teamSpecific = teamData[5];

            location.assign('./page2.html?q='+teamSpecific+'&con2='+conferencePg2+'&div2='+divisionPg2+'&abbr='+teamAbbr);
            // // teamHeader(teamSpecific, conferencePg2, divisionPg2);    
        })        
        .catch(function (error) {console.log('error', error);  
    });
})

// When a player name is submitted into the search bar, an event listener triggers a function to search for any player that has the specified name.
$("#search-submit").on("click", function searchPlayer(event){
    event.preventDefault();
    let playerSearchUrl = "https://www.balldontlie.io/api/v1/players?search";
    let playerName = $("#search-entry").val();
    let userParam = jQuery.param({ "": playerName});
    let playerSearchFetchUrl = playerSearchUrl + userParam;

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
                console.log(playerStats)
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

        // ul (can add class for styling)
        let cardUl = document.createElement('ul');
        cardUl.classList.add('left')

        // will be a scheduled game for that day
        let cardList1 = document.createElement('li');
        cardList1.classList.add('card-text')
        cardList1.textContent = 'This is a test';

        //everything is appended
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
    // nextDay.setDate(nextDay.getDate() + 1);
    // return nextDay;
}

// // This function reformats the date that the API recognizes
// function formatDate(date) {
//     const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//         "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     let day = date.getDate();
//     let month = date.getMonth();
//     let year = date.getFullYear();
//     return year + "-" + monthNames[month] + "-" + (day);
// }
  
// // The 6 days we have to get the date for
// let day1 = new Date();
// let day2 = getNextDay(day1);
// let day3 = getNextDay(day2);
// let day4 = getNextDay(day3);
// let day5 = getNextDay(day4);
// let day6 = getNextDay(day5);

// // Create a list of the days
// let dates = [day1,day2,day3,day4,day5,day6]  
// // console.log(dates);

// // For each date we're going to make an API request to get the NBA game for specific day
// function only1day (day1) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day1) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[0].appendChild(test)
//         });
//     });
// }
// only1day(day1);

// function only2day (day2) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day2) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[1].appendChild(test)
//         });
//     });
// }
// only2day(day2);

// function only3day(day3) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day3) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[2].appendChild(test)
//         });
//     });
// }
// only3day(day3);

// function only4day (day4) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day4) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[3].appendChild(test)
//         });
//     });
// }
// only4day(day4);

// function only5day (day5) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day5) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[4].appendChild(test)
//         });
//     });
// }
// only5day(day5);

// function only6day (day6) {
//     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(day6) + '?key=c55e28baecdc43b59a80d237643bde43')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//         // Udates the code
//         data.forEach(function (entry) {
//             let away = entry.AwayTeam
//             let home = entry.HomeTeam
//             let test = document.createElement('p')
//             test.classList.add('center')
//             test.innerHTML = `${away} vs ${home}`
//             cards[5].appendChild(test)
//         });
//     });
// }
// only6day(day6);

// //This is a test for loop, I tried to get these cards to display in a for loop, but kept throwing error on the appendChild line. We may want to see if we can get it to work in the loop. But it works great like it is.

// // for (i=0; i<cards.length;i++){
// //     // For each date we're going to make an API request to get the NBA game for specific day
// //     // console.log("Date: " + formatDate(dates[i]));
// //     fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + formatDate(dates[i]) + '?key=c55e28baecdc43b59a80d237643bde43')
// //         .then(function (response) {
// //             return response.json();
// //         })
// //         .then(function (data) {
// //         // Udates the code
// //         data.forEach(function (entry) {
// //             // console.log(entry.AwayTeam);
// //             // console.log(entry.HomeTeam);
// //             let away = entry.AwayTeam
// //             let home = entry.HomeTeam
// //             // console.log(entry);
// //             // console.log(cards[0])
// //             let test = document.createElement('p')
// //             test.classList.add('center')
// //             test.innerHTML = `${away} vs ${home}`
// //             cards.appendChild(test)
// //         });
// //     });
// // }

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