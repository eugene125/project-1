let apiKey2 = "key=52f58b6c75b1451698114fb10f4d07f0"
let bigTable = $('#table')
let tableBody = $('#table-body')
var teamAbbr3 = ""
console.log(conferencePg2);

//Here we are taking the information that we appended to the URL and splitting it into useable data
function getParams(){
    var searchParamsArray = document.location.search.split('&')
    console.log(searchParamsArray);

    teamSpecific = searchParamsArray[0].split('=').pop().replace('%20', ' ').replace('%20', ' ');
    conferencePg2 = searchParamsArray[1].split('=').pop();
    console.log(conferencePg2);
    divisionPg2 = searchParamsArray[2].split('=').pop();
    teamAbbr3 = searchParamsArray[3].split('=').pop();
    
    teamHeader(teamSpecific, conferencePg2, divisionPg2)
    // return(teamSpecific, conferencePg2, divisionPg2);
}
getParams()

console.log(conferencePg2);


function teamHeader(teamSpecific, conferencePg2, divisionPg2){
    console.log('team header fired');
    console.log(teamSpecific, conferencePg2, divisionPg2);

    //declares variable for jumbotron div
    let teamPg2 = document.getElementById('teamInfo');

    //creates h1 content
    let teamHeader = document.createElement('h1');
    teamHeader.textContent = teamSpecific;
    teamHeader.classList.add('center')

    //creates ul
    let teamUl = document.createElement('ul');
    teamUl.classList.add('center')
    teamUl.classList.add('left')

    //creates Li
    let teamLi1 = document.createElement('p');
    teamLi1.textContent = `Conference: ${conferencePg2}`;

    //creates Li
    let teamLi2 = document.createElement('p');
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

//this is what allows us to grab all the players part of a team and gather their season stats
function fetchSeasonStats(){ //Here I created a function to dynamically attach the player stats by team
    let seasonStatsUrl = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByTeam/2022/"
    
    //Due to API limitations, some of the teams are displayed by two variables. So I created a switch case to hold the new variables without setting each one individually
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
                        
        //I then created a new URL              
    let seasonStatsFetchUrl = seasonStatsUrl + teamAbbr + "?" + apiKey2




    console.log(teamAbbr)
    console.log(seasonStatsFetchUrl)
    fetch(seasonStatsFetchUrl)
        .then(function (response) {
            return response.json() 
        })
        .then(function (result) {
            let playersByTeam = result
            console.log(playersByTeam) 

            //I then put the information about the team into the a dynamically created table so that we would not need to make a new one for each team
         function displayStats(){
             
            for(var i=0; i<= playersByTeam.length; i++ ){

                let tableRow = document.createElement('tr');

                let fullName = document.createElement('td');
                fullName.textContent = playersByTeam[i].Name

                let position = document.createElement('td');
                position.textContent = playersByTeam[i].Position;

                let gp = document.createElement('td');
                gp.textContent = playersByTeam[i].Games
                
                let pointsScored = document.createElement('td');
                pointsScored.textContent = playersByTeam[i].Points
                
                let assist = document.createElement('td');
                assist.textContent = playersByTeam[i].Assists

                let rebound = document.createElement('td');
                rebound.textContent = playersByTeam[i].Rebounds

                let fGoal = document.createElement('td');
                fGoal.textContent = playersByTeam[i].FieldGoalsAttempted

                let fGoalPerc = document.createElement('td');
                fGoalPerc.textContent = playersByTeam[i].FieldGoalsPercentage

                let threeAtt = document.createElement('td');
                threeAtt.textContent = playersByTeam[i].ThreePointersAttempted

                let threePerc = document.createElement('td');
                threePerc.textContent = playersByTeam[i].ThreePointersPercentage
                

                let tOver = document.createElement('td');
                tOver.textContent = playersByTeam[i].Turnovers

                let pFoul = document.createElement('td');
                pFoul.textContent = playersByTeam[i].PersonalFouls
               

                tableRow.append( fullName, position, gp, pointsScored, assist, rebound, fGoal, fGoalPerc,threeAtt, threePerc,  tOver, pFoul, );
                tableBody.append(tableRow);
            }
        }  
            displayStats();
        // This is where we append the data on page2.html
        }
        )
        .catch(function (error) {
            console.log('error', error);  
        })
    }


fetchSeasonStats()



teamToFilterFor = teamAbbr;     /* Sample team to filter for */

fetch("https://api.sportsdata.io/v3/nba/scores/json/Games/2022?key=52f58b6c75b1451698114fb10f4d07f0")
    .then(function (response) {
        return response.json();
    }).then(function (gamesArray) {
        // `gamesArray` contains an array of thousands of elements that we need to filter by team name first.
        gamesArray.forEach(function (game) {
            homeTeam = game["HomeTeam"];
            awayTeam = game["AwayTeam"];
            gameDate = new Date(game["Day"]);
            today = new Date();

            if ((homeTeam === teamToFilterFor || awayTeam === teamToFilterFor) && gameDate >= today) {
                // TODO: Update the HTML page to add the game `game`
                //  onto the page.
                console.log(homeTeam + " vs " + awayTeam + " on " + gameDate);
            }
        });
});


/* Sample team to filter for */

fetch("https://api.sportsdata.io/v3/nba/scores/json/teams?key=52f58b6c75b1451698114fb10f4d07f0")
    .then(function (response) {
        return response.json();
    }).then(function (teamsArray) {
        
        console.log(teamsArray);

    teamsArray.forEach(function(team){
        logo = team["WikipediaLogoUrl"];
        homeTeam = team["Key"];
        primColor= team["PrimaryColor"];
        secColor= team["SecondaryColor"];
        if (homeTeam === teamToFilterFor) {
            let teamlogo = document.getElementById('teamLogo');
            teamlogo.src=logo;
            let jamboTron = document.getElementById('jamboColor');
            console.log("this is"+ jamboTron);
            jamboTron.style.backgroundColor = "#"+ primColor;
            //document.body.style.backgroundColor="#" + secColor;
            
        }
    })
});
