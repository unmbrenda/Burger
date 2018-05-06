const addBurgerForm = document.getElementById("add-burger-form");
const readyBurgerDiv = document.getElementById("readyBurgers");
const devouredBurgerDiv = document.getElementById("devouredBurgers");

function getBurgerForm(burgerData) {

  const name = document.createElement("span");
  name.classList.add("burger-name");
  name.innerText = burgerData.burger_name;

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("name-div");
  nameDiv.appendChild(name);

  const btn = document.createElement("button");
  btn.classList.add("devour-btn");
  btn.setAttribute("data-name", burgerData.burger_name);
  btn.setAttribute("data-id", burgerData.id);
  btn.setAttribute("data-devoured", burgerData.devoured);
  btn.innerText = "Devour!";

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("devour-div");
  btnDiv.appendChild(btn)

  const burgerDiv = document.createElement("div");
  burgerDiv.classList.add("burger-div")
  burgerDiv.appendChild(nameDiv);
  burgerDiv.appendChild(btnDiv);

  return burgerDiv;
};

async function devourBurger(burger){

  const burgerBtn = burger.querySelector(".devour-btn");
  const devouredBurger = {
    name: burgerBtn.getAttribute("data-name"),
    devoured: true,
    id: burgerBtn.getAttribute("data-id")
  };

  const req = {
    body: JSON.stringify(devouredBurger),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  };

  return await fetch(`/burger/${devouredBurger.id}`, req)
    .then( response => {
      if( response.ok ) {
        return response.json();
      }
      throw `${response.status}: ${response.statusText}`;
    });

}

async function addBurger(name) {
  const req = {
    body: JSON.stringify({ name: name }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  }

  return await fetch('/burger', req)
    .then(response => {
      if (response.ok) {
        return response.json(); //New Burger
      }
      throw `${response.status}: ${response.statusText}`;
    });
}

function addBurgerSubmit(event) {
  event.preventDefault();

  addBurger(addBurgerForm.name.value)
    .then(data => {
      const newBurger = getBurgerForm(data);
      readyBurgerDiv.appendChild(newBurger);
    })
    .catch(error => {
      console.log(error);
      alert('Unable to create burger.');
    })

  addBurgerForm.reset();
}

addBurgerForm.addEventListener("submit", addBurgerSubmit);
readyBurgerDiv.addEventListener("click", event => {
  if( event.target.classList.contains("devour-btn")){
    const burger = event.target.parentElement.parentElement;
    devourBurger(burger)
      .then( devoured => {
        devouredBurgerDiv.appendChild(burger);
        burger.querySelector(".devour-btn").style.display = "none";
      })
      .catch( error => {
        console.log( error );
      });
  }
});