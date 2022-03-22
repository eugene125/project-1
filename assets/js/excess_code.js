// This extra script file contains certain code that we didn't implement at this time. We discussed maybe including them in the future and left it here as a reference to what we were intending to do.


/* 

script.js 

line 36 
teamHeader(teamSpecific, conferencePg2, divisionPg2);

function formCalendar(){
  
line 159
    let now = moment().format("YYYY-MMM-DD")
    let daysArr = [now, ];
    
    function getDays() {
        // console.log(now);
        for (i=1; i<6; i++){
            let nextDay = moment(now, "YYYY-MMM-DD").add(i, "days")
            daysArr.push(nextDay.format("YYYY-MMM-DD"))
        }
        // console.log(daysArr)
} getDays()

// console.log(daysArr)
// we want a function that initializes all the things we want
    // get data for today's game and render that card
    // get data for tomorrow game and render
    // get data for tomorrow++ etc

    //function renderGameForDay (games, day){
// returns html to page
    //}

    // function getGameData (whichDay) {
        // does the fetch
        //then takes that days game data and invokes the renderGameForDay
    //}

    function getSchedule(){
        // getGameData(moment().now());
        // getGameData(now + 1day)
        // getGameData(now + 2 days)
        // getGameData(now+3days)
        // getGameDay();
    
        for (i=0; i<cards.length;i++){
        fetch('https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/' + (daysArr[i]) + '?key=c55e28baecdc43b59a80d237643bde43')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            data.forEach(function (entry) {
                // console.log(entry.AwayTeam);
                // console.log(entry.HomeTeam);
                let away = entry.AwayTeam
                let home = entry.HomeTeam
                console.log(entry);
                // console.log(cards[0])
                let appendP = $("<p>", {id: "pContainer"}).appendTo(".card-body")
                appendP.css('text-align', 'center')
                appendP.text(`${away} vs ${home}`)
                });
            });
        }
    }getSchedule()
}formCalendar()


stats.js

Line 128
// This function is intended to filter for a specific team's upcoming games
teamToFilterFor = teamAbbr;

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
                console.log(homeTeam + " vs " + awayTeam + " on " + gameDate);
        }
    });
});



page2.html

line 60
<!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Player's Full Name
          
          
          " aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->


*/