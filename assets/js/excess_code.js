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





*/