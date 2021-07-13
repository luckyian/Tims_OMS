const storeTypeSelect = document.querySelector("#type");
const storeForm = document.querySelector(".811-form");
const storeForm = document.querySelector(".608-form");
const storeForm = document.querySelector(".1477-form");
const storeForm = document.querySelector(".122-form");
const storeForm = document.querySelector(".1455-form");
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

let storeType = null;
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

function handlestoreTypeChange(event) {
  storeType = event.target.value;

  if (storeType === ("811", "608", "1477", "122", "1455")) {
    storeForm.classList.remove("d-none");
    pick-listForm.classList.add("d-none");
  } else if (storeType === "pick-list") {
    pickListForm.classList.remove("d-none");
    storeForm.classList.add("d-none");
  } else {
    storeForm.classList.add("d-none");
    pickListForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (storeType === "pick-list") {
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
  } else if (storeType === ("811", "608", "1477", "122", "1455")) {
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

  if (storeType === ("811", "608","1477","122","1455")) {
    orderData.type = storeType;
    orderData.name = orderNameInput.value.trim();
    orderData.distance = Number(distanceInput.value.trim());
    orderData.duration = Number(durationInput.value.trim());
  } else if (storeType === "pick-list") {
    orderData.type = "pick-list";
    orderData.name = nameInput.value.trim();
    orderData.weight = Number(weightInput.value.trim());
    orderData.sets = Number(setsInput.value.trim());
    orderData.reps = Number(repsInput.value.trim());
    orderData.duration = Number(pick-listDurationInput.value.trim());
  }

  await API.addOrder(orderData);
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

if (storeTypeSelect) {
  storeTypeSelect.addEventListener("change", handlestoreTypeChange);
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
