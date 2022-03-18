$(".dropdown-item").on("click", function teamSearch(){
    console.log( $(this).attr("data-nba-id") );
    var nbaId = $(this).attr("data-nba-id");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var url = "https://www.balldontlie.io/api/v1/teams/";
    var newUrl = url + nbaId
    
    fetch(newUrl, requestOptions)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (result) {
            let teamData = Object.values(result)
            let teamNames = Object.values(teamData[teamData.length-2])
            
            console.log(teamData)
            console.log(teamNames)
            console.log(teamData[teamData.length-2])
            console.log(result)
            console.log(teamNames[29].full_name)
            console.log(teamData)
            console.log(teamData[0][6].full_name)
                
        })
        .catch(function (error) {console.log('error', error)    
    });
})



// This function dynamically displays information onto our cards
function cardFront(){

    var cards = document.querySelectorAll('.card-body');  // this is what we will append scheduled games to in the for loop below
    console.log(cards);
   
    for(i=0; i<cards.length; i++){

        var dayCard = moment().add(i, 'days').format('l');  // gives us next 5 days
        
        var cardDate = document.createElement('h5');   // header
        cardDate.classList.add('card-title');
        cardDate.textContent = dayCard;

        var cardUl = document.createElement('ul');  // ul (can add class for styling)
        cardUl.classList.add('left')

        var cardList1 = document.createElement('li');   // will be a scheduled game for that day
        cardList1.classList.add('card-text')
        cardList1.textContent = 'This is a test';

        cards[i].appendChild(cardDate);    //everything is appended
        cards[i].appendChild(cardUl);
        cardUl.appendChild(cardList1);

    }
}

cardFront()




