const API = {
  async getLastOrder() {
    let res;
    try {
      res = await fetch("/api/orders");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addOrder(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/orders/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createOrder(data = {}) {
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getOrdersInRange() {
    const res = await fetch(`/api/orders/range`);
    const json = await res.json();

    return json;
  },
};
