// Global variables
let apiKey2 = "key=52f58b6c75b1451698114fb10f4d07f0"
let bigTable = $('#table')
let tableBody = $('#table-body')
let teamAbbr3 = ""

// Here we are taking the information that we appended to the URL and splitting it into useable data
function getParams(){
    var searchParamsArray = document.location.search.split('&')

    teamSpecific = searchParamsArray[0].split('=').pop().replace('%20', ' ').replace('%20', ' ');
    conferencePg2 = searchParamsArray[1].split('=').pop();
    divisionPg2 = searchParamsArray[2].split('=').pop();
    teamAbbr3 = searchParamsArray[3].split('=').pop();
    
    teamHeader(teamSpecific, conferencePg2, divisionPg2)
}
getParams()

function teamHeader(teamSpecific, conferencePg2, divisionPg2){
    //Declares variable for jumbotron div
    let teamPg2 = document.getElementById('teamInfo');

    // Creating elements to append to
    let teamHeader = document.createElement('h1');
    let teamUl = document.createElement('ul');
    let teamLi1 = document.createElement('p');
    let teamLi2 = document.createElement('p');

    // Styling and appending the created elements
    teamHeader.textContent = teamSpecific;
    teamHeader.classList.add('center')
    teamUl.classList.add('center')
    teamUl.classList.add('left')
    teamLi1.textContent = `Conference: ${conferencePg2}`;
    teamLi2.textContent = `Division: ${divisionPg2}`;
    teamPg2.appendChild(teamHeader);
    teamPg2.appendChild(teamUl);
    teamUl.appendChild(teamLi1);
    teamUl.appendChild(teamLi2);
}


// The following function allows us to fetch all players part of a team and gather their season stats that we will append to the webpage
function fetchSeasonStats(){ 
    let seasonStatsUrl = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByTeam/2022/"
    
    //Due to API limitations, some of the teams are displayed by two variables. The following switch/case statement converts certain variables to fit the criteria for a separate API fetch
    switch (teamAbbr3){
        case "GSW":
            teamAbbr = "GS"
            break;
        case "NOP":
            teamAbbr = "NO"
            break;
        case "NYK":
            teamAbbr = "NY"
            break;
        case "SAS":
            teamAbbr = "SA"
            break;
        case "PHX":
            teamAbbr = "PHO"
            break;
        default:
            teamAbbr = teamAbbr3
    }

    let seasonStatsFetchUrl = seasonStatsUrl + teamAbbr + "?" + apiKey2

    fetch(seasonStatsFetchUrl)
        .then(function (response) {
            return response.json() 
        })
        .then(function (result) {
            let playersByTeam = result

        // The following function creates table elements that certain player stats is appended to
        function displayStats(){
             
            for(var i=0; i<= playersByTeam.length; i++ ){
                // Creating elements that are part of the table
                let tableRow = document.createElement('tr');
                let fullName = document.createElement('td');
                let position = document.createElement('td');
                let gp = document.createElement('td');
                let pointsScored = document.createElement('td');
                let assist = document.createElement('td');
                let rebound = document.createElement('td');
                let fGoal = document.createElement('td');
                let fGoalPerc = document.createElement('td');
                let threeAtt = document.createElement('td');
                let threePerc = document.createElement('td');
                let tOver = document.createElement('td');
                let pFoul = document.createElement('td');

                // Grabbing the data and connecting it to the correspond table positions
                fullName.textContent = playersByTeam[i].Name
                position.textContent = playersByTeam[i].Position;
                gp.textContent = playersByTeam[i].Games
                pointsScored.textContent = playersByTeam[i].Points
                assist.textContent = playersByTeam[i].Assists
                rebound.textContent = playersByTeam[i].Rebounds
                fGoal.textContent = playersByTeam[i].FieldGoalsAttempted
                fGoalPerc.textContent = playersByTeam[i].FieldGoalsPercentage
                threeAtt.textContent = playersByTeam[i].ThreePointersAttempted
                threePerc.textContent = playersByTeam[i].ThreePointersPercentage
                tOver.textContent = playersByTeam[i].Turnovers
                pFoul.textContent = playersByTeam[i].PersonalFouls

                // Actually appending the data to the table
                tableRow.append( fullName, position, gp, pointsScored, assist, rebound, fGoal, fGoalPerc,threeAtt, threePerc,  tOver, pFoul, );
                tableBody.append(tableRow);
            }
        }  
            displayStats();
    })
    .catch(function (error) {
        console.log('error', error);
    })
}

fetchSeasonStats()

/* Sample team to filter for */
teamToFilterFor = teamAbbr;
fetch("https://api.sportsdata.io/v3/nba/scores/json/teams?key=52f58b6c75b1451698114fb10f4d07f0")
    .then(function (response) {
        return response.json();
    })
    .then(function (teamsArray) {
        teamsArray.forEach(function(team){
        logo = team["WikipediaLogoUrl"];
        homeTeam = team["Key"];
        primColor= team["PrimaryColor"];
        secColor= team["SecondaryColor"];
        if (homeTeam === teamToFilterFor) {
            let teamlogo = document.getElementById('teamLogo');
            teamlogo.src=logo;
            let jamboTron = document.getElementById('jamboColor');
            jamboTron.style.backgroundColor = "#"+ primColor;
        }
    })
});