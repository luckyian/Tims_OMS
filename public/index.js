init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const order = await API.getLastOrder();
    if (order) {
      location.search = "?id=" + order._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

