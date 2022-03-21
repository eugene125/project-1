let apiKey = "key=b6621a5a4f174d1fa154420458cf0a07"
let bigTable = $('#table')
let tableBody = $('#table-body')

function getParams(){
    var searchParamsArray = document.location.search.split('&')
    console.log(searchParamsArray);

    teamSpecific = searchParamsArray[0].split('=').pop().replace('%20', ' ');
    conferencePg2 = searchParamsArray[1].split('=').pop();
    divisionPg2 = searchParamsArray[2].split('=').pop();
    
    teamHeader(teamSpecific, conferencePg2, divisionPg2)
    // return(teamSpecific, conferencePg2, divisionPg2);
}
getParams()

function teamHeader(teamSpecific, conferencePg2, divisionPg2){
    console.log('team header fired');
    console.log(teamSpecific, conferencePg2, divisionPg2);

    //declares variable for jumbotron div
    let teamPg2 = document.getElementById('teamInfo');

    //creates h1 content
    let teamHeader = document.createElement('h1');
    teamHeader.textContent = teamSpecific;

    //creates ul
    let teamUl = document.createElement('ul');

    //creates Li
    let teamLi1 = document.createElement('li');
    teamLi1.textContent = `Conference: ${conferencePg2}`;

    //creates Li
    let teamLi2 = document.createElement('li');
    teamLi2.textContent = `Division: ${divisionPg2}`;

    //appends h1
    teamPg2.appendChild(teamHeader);
    //appends ul
    teamPg2.appendChild(teamUl);
    //appends Li
    teamUl.appendChild(teamLi1);
    //appends Li
    teamUl.appendChild(teamLi2);
}

/*
// Don't know exactly where this needs to be implemented, but this is what allows us to grab all the players part of a team and gather their season stats
(function fetchSeasonStats(){
    let seasonStatsUrl = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByTeam/2022/"
    let seasonStatsFetchUrl = seasonStatsUrl + teamAbbr + "?" + apiKey

    fetch(seasonStatsFetchUrl)
        .then(function (response) {
            return response.json() 
        })
        .then(function (result) {
            let playersByTeam = result
            console.log(playersByTeam) 
            
            // This is where we append the data on page2.html
        })
        .catch(function (error) {
            console.log('error', error);  
        })
    })
*/

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

function teamStats(){
    for( i=0; i<player.length; i++ ){
        let tableRow = document.createElement('tr')

        let num = document.createElement('th');
        num.textContent = player[i].number;

        let first = document.createElement('td');
        first.textContent = player[i].firstName;

        let last = document.createElement('td');
        last.textContent = player[i].lastName

        let position = document.createElement('td');
        position.textContent = player[i].stats.pos;
       
        let gp = document.createElement('td');
        gp.textContent = player[i].stats.games;

        let pointsScored = document.createElement('td');
        pointsScored.textContent = player[i].stats.points;

        let fGoal = document.createElement('td');
        fGoal.textContent = player[i].stats.fG;

        let fGoalPerc = document.createElement('td');
        fGoalPerc.textContent = player[i].stats.fGperc;

        let threePerc = document.createElement('td');
        threePerc.textContent = player[i].stats.threePtPerc

        let rebound = document.createElement('td');
        rebound.textContent = player[i].stats.reb;

        let assist = document.createElement('td');
        assist.textContent = player[i].stats.ast;

        let tOver = document.createElement('td');
        tOver.textContent = player[i].stats.to;

        let pFoul = document.createElement('td');
        pFoul.textContent = player[i].stats.pf;

        // appends each row to the body
        tableBody.appendChild(tableRow);
        tableRow.append(num, first, last, position, gp, pointsScored, fGoal, fGoalPerc, threePerc, rebound, assist, tOver, pFoul);
    }
    //appends body to the main table div
    table.appendChild(tableBody); 
}
teamStats()

function team_schedule(){
    fetch("https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2022?key=c55e28baecdc43b59a80d237643bde43")
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
  }
  
  team_schedule();