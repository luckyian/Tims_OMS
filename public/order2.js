const orderTypeSelect = document.querySelector("#type");
const orderForm = document.querySelector(".order-form");
const pickListForm = document.querySelector(".pick-list-form");
const orderNameInput = document.querySelector("#order-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const pickListDurationInput = document.querySelector("#pick-list-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const neworder = document.querySelector(".new-order")

let orderType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let order;

  if (location.search.split("=")[1] === undefined) {
    order = await API.createOrder()
    console.log(order)
  }
  if (order) {
    location.search = "?id=" + order._id;
  }

}

initExercise();

function handleorderTypeChange(event) {
  orderType = event.target.value;

  if (orderType === "order") {
    orderForm.classList.remove("d-none");
    pick-listForm.classList.add("d-none");
  } else if (orderType === "pick-list") {
    pickListForm.classList.remove("d-none");
    orderForm.classList.add("d-none");
  } else {
    orderForm.classList.add("d-none");
    pickListForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (orderType === "pick-list") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (pick-listDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (orderType === "order") {
    if (orderNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let orderData = {};

  if (orderType === "order") {
    orderData.type = "order";
    orderData.name = orderNameInput.value.trim();
    orderData.distance = Number(distanceInput.value.trim());
    orderData.duration = Number(durationInput.value.trim());
  } else if (orderType === "pick-list") {
    orderData.type = "pick-list";
    orderData.name = nameInput.value.trim();
    orderData.weight = Number(weightInput.value.trim());
    orderData.sets = Number(setsInput.value.trim());
    orderData.reps = Number(repsInput.value.trim());
    orderData.duration = Number(pick-listDurationInput.value.trim());
  }

  await API.addExercise(orderData);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  orderNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  pickListDurationInput.value = "";
  weightInput.value = "";
}

if (orderTypeSelect) {
  orderTypeSelect.addEventListener("change", handleorderTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
