// chip = exercise
// order = workout
// <!-- pick-list = resistance -->
// <!-- order = cardio -->

async function initOrder() {
  const lastOrder = await API.getLastOrder();
  console.log("Last Order:", lastOrder);
  if (lastOrder) {
    document
      .querySelector("a[href='/chip?']")
      .setAttribute("href", `/chip?id=${lastOrder._id}`);

    const orderSummary = {
      date: formatDate(lastOrder.day),
      totalDuration: lastOrder.totalDuration,
      numChips: lastOrder.chips.length,
      ...tallyChips(lastOrder.chips)
    };

    renderOrderSummary(orderSummary);
  } else {
    renderNoOrderText()
  }
}

function tallyChips(chips) {
  const tallied = chips.reduce((acc, curr) => {
    if (curr.type === "pick-list") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "order") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderOrderSummary(summary) {
  const container = document.querySelector(".order-stats");

  const orderKeyMap = {
    date: "Date",
    totalDuration: "Total Order Duration",
    numChips: "Chips Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = orderKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoOrderText() {
  const container = document.querySelector(".order-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a Order yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initOrder();
