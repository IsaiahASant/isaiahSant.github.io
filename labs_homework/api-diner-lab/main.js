"use strict";

function init() {
  let btn = document.getElementById("meal-btn");
  btn.addEventListener("click", fetchMeal);
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


