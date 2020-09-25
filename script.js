let output = document.getElementById('output');
let output2 = document.getElementById('output2');
let output3 = document.getElementById('output3');
let d1 = document.querySelectorAll('.d1');
let scoreBoard1 = document.getElementById('score1');
let scoreBoard2 = document.getElementById('score2');
let check = document.getElementById ('check');
let btnClear = document.getElementById ('clear');
let score1 = 0;
let score2 = 0;
let results;
let bonneReponse ;
let mauvaiseReponse;
let userResponse;
let infoSaved1 = localStorage.getItem('score1');
let infoSaved2 = localStorage.getItem('score2');


fetch1();  

function fetch1() {
   
   
fetch("https://opentdb.com/api.php?amount=1",)
.then(response => response.json())
.then(response=> {
    
  output2.innerHTML =  (response.results[0].question) ;
  output.innerHTML = "Category"  + " : " +  (response.results[0].category);
  output3.innerHTML = "Difficulty" + " : " +  (response.results[0].difficulty);
 
  
 console.log(response.results[0]);
 n= response.results[0].incorrect_answers.length > 1 ? 3 :1 ;
 if(n==1){
    d1[2].innerHTML='';
    d1[3].innerHTML= '';
 }
 let j = 0 ;
 var rand = Math.round(Math.random() * n);
 for (var i = 0; i <= n; i++) {
    if (i == rand) {
        d1[i].innerHTML =`  
        <button type="button" class="  btn btn-warning btn-lg  ">${response.results[0].correct_answer}</button>     `
    } else {
        d1[i].innerHTML =`
        <button type="button" class="  btn btn-warning btn-lg ">  ${response.results[0].incorrect_answers[j]} </button>  `;
        j++ }
    }
    results = response.results[0];
    bonneReponse = results.correct_answer;
    mauvaiseReponse = results.incorrect_answers;
    })
            
           
.catch(error => alert("Erreur : " + error));
}

d1.forEach((div) => { 
    div.addEventListener('click', (e) => {
        userResponse = e.target.textContent;
        e.target.style.backgroundColor = "rgb(20,163,184)";

    });

 });


function checkReponse(){

        if(userResponse == bonneReponse){
            score1++;
            scoreBoard1.textContent = score1;
            fetch1();
            save();
        }
        else{
            score2++;
            scoreBoard2.textContent = score2;
            fetch1();
            save();
        }
}


function save(){
localStorage.setItem('score1', scoreBoard1.textContent);
localStorage.setItem('score2', scoreBoard2.textContent);
};

if(scoreBoard1.textContent !== 0 || scoreBoard2.textContent!== 0) 
{
    scoreBoard1.textContent = infoSaved1;
    scoreBoard2.textContent = infoSaved2;
}

function clearAll(){
    localStorage.clear()
    score1 = 0;
    score2 = 0;
    scoreBoard1.textContent = 0;
    scoreBoard2.textContent = 0;

}
check.addEventListener('click',checkReponse);
btnClear.addEventListener('click',clearAll)