
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://www.balldontlie.io/api/v1/teams", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));



// This function dynamically displays information onto our cards
function cardFront(){

    var cards = document.querySelectorAll('.card-body');  // this is what we will append scheduled games to in the for loop below
    console.log(cards);
   
    for(i=0; i<6; i++){

        var dayCard = moment().add(i, 'days').format('l');  // gives us next 5 days
        console.log(dayCard);
        
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

