
let teamSpecific;
let conferencePg2;
let divisionPg2;



function getParams(){
    var searchParamsArray = document.location.search.split('&')
    console.log(searchParamsArray);

    teamSpecific = searchParamsArray[0].split('=').pop().replace('%20', ' ');
    conferencePg2 = searchParamsArray[1].split('=').pop();
    divisionPg2 = searchParamsArray[2].split('=').pop();
    
    console.log(teamSpecific);
    console.log(conferencePg2);
    console.log(divisionPg2);
    teamHeader(teamSpecific, conferencePg2, divisionPg2)
    // return(teamSpecific, conferencePg2, divisionPg2);

}
getParams()


console.log(teamSpecific);
console.log(conferencePg2);
console.log(divisionPg2);





function teamHeader(teamSpecific, conferencePg2, divisionPg2){
    console.log('team header fired');
    console.log(teamSpecific);

    let teamPg2 = document.getElementById('teamInfo');

    let teamHeader = document.createElement('h1');
    teamHeader.textContent = teamSpecific;

    let teamUl = document.createElement('ul');

    let teamLi1 = document.createElement('li');
    teamLi1.textContent = conferencePg2;

    let teamLi2 = document.createElement('li');
    teamLi2.textContent = divisionPg2;

    teamPg2.appendChild(teamHeader);
    teamPg2.appendChild(teamUl);
    teamUl.appendChild(teamLi1);
    teamUl.appendChild(teamLi2);
}






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

var bigTable = document.getElementById('table')
var tableBody = document.getElementById('table-body')

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


