let apiKey = "key=b6621a5a4f174d1fa154420458cf0a07"
let bigTable = $('#table')
let tableBody = $('#table-body')
var teamAbbr3 = ""

function getParams(){
    var searchParamsArray = document.location.search.split('&')
    console.log(searchParamsArray);

    teamSpecific = searchParamsArray[0].split('=').pop().replace('%20', ' ');
    conferencePg2 = searchParamsArray[1].split('=').pop();
    divisionPg2 = searchParamsArray[2].split('=').pop();
    teamAbbr3 = searchParamsArray[3].split('=').pop();
    
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

// Don't know exactly where this needs to be implemented, but this is what allows us to grab all the players part of a team and gather their season stats
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
        default:
            teamAbbr = teamAbbr3
    }
                        
                        
    let seasonStatsFetchUrl = seasonStatsUrl + teamAbbr + "?" + apiKey




    console.log(teamAbbr)
    console.log(seasonStatsFetchUrl)
    fetch(seasonStatsFetchUrl)
        .then(function (response) {
            return response.json() 
        })
        .then(function (result) {
            let playersByTeam = result
            console.log(playersByTeam) 


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
                threePerc.textContent = playersByTeam[i].ThreePointersAttempted
                

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




// function teamStats(){
//     for( i=0; i<player.length; i++ ){
//         let tableRow = document.createElement('tr')

//         let num = document.createElement('th');
//         num.textContent = player[i].number;

//         let first = document.createElement('td');
//         first.textContent = player[i].firstName;

//         let last = document.createElement('td');
//         last.textContent = player[i].lastName

//         let position = document.createElement('td');
//         position.textContent = player[i].stats.pos;
       
        


//         // appends each row to the body

//     }
//     //appends body to the main table div
//     table.appendChild(tableBody); 
// }
// teamStats()