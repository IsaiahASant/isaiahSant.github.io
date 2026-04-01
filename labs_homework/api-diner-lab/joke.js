"use strict";

function init() {
  let btn = document.getElementById("joke-btn");
  btn.addEventListener("click", fetchJoke);
}

function fetchDog() {
  let url = "https://dog.ceo/api/breeds/image/random";
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showDog)
    .catch(handleError);
}

function showDog(data) {
console.log("Dog data:", data);
  let img = document.createElement("img");
  img.src = data.message;
  img.alt = "A random dog";
  document.getElementById("output").appendChild(img);
}

async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

function handleError(err) {
  console.error("Something went wrong:", err);
  document.getElementById("output").textContent =
    "The kitchen is closed! (Error loading data)";
}

init();

function fetchMeal() {
  let food = document.getElementById("food-input").value;
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
  fetch(url)
    .then(statusCheck)
    .then(resp => resp.json())
    .then(showMeals)
    .catch(handleError);
}

function showMeals(data){
  if(data.meals === null){
    console.log("Sorry, that's not on our menu!")
    let sorry = document.createElement("h1");
    sorry.textContent = "Sorry, that's not on our menu!";
    document.getElementById("meal-output").appendChild(sorry);
  }else{

  
    console.log("Meal Data: " , data);
    for(let i = 0; i < data.meals.length; i ++){

        let strMeal = document.createElement("p");
        let strCategory = document.createElement("p");
        let img = document.createElement("img");

        strMeal.textContent = data.meals[i].strMeal;
        strCategory.textContent = data.meals[i].strCategory;
        img.src = data.meals[i].strMealThumb;
        img.alt = "image of strMealThumb";

        document.getElementById("meal-output").appendChild(strMeal);
        document.getElementById("meal-output").appendChild(strCategory);
        document.getElementById("meal-output").appendChild(img);
        console.log(data.meals[i].strMeal);

      }
  }
}

 function fetchJoke(){
    const url = "https://official-joke-api.appspot.com/random_joke";
    fetch(url)
    .then(statusCheck) // Assuming your existing statusCheck helper
    .then(resp => resp.json())
    .then(data => {
      const output = document.getElementById("joke-output");
      output.innerHTML = "";




      let setup = document.createElement("p");
        setup.textContent = data.setup;


    let punchline = document.createElement("p");
    punchline.textContent = data.punchline;
    punchline.style.filter = "blur(8px)";
    punchline.style.opacity = "0";
    punchline.style.transition = "all 0.7s ease-in-out";




    let revealBtn = document.createElement("button");
    revealBtn.textContent = "Show Punchline";
   
    output.appendChild(setup);
        output.appendChild(punchline);
        output.appendChild(revealBtn);


    const reveal = function() {
        punchline.style.filter = "blur(0)";
        punchline.style.opacity = "1";
        revealBtn.disabled = true;
        revealBtn.textContent = "hahaha";
    };
    revealBtn.onclick = reveal;


    setTimeout(reveal, 3000);
})
    .catch(handleError);
}


