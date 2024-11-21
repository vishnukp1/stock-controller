const baseUrl = "http://localhost:5000";

const stockForm = document.getElementById("stockForm");
const stockTable = document.querySelector("#stockTable tbody");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

async function fetchStocks() {
  const response = await fetch(`${baseUrl}/stock`);
  const data = await response.json();
  stockTable.innerHTML = data.data
    .map(
      (stock) => `
    <tr>
      <td>${stock._id}</td>
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td>${stock.category}</td>
      <td>
        <button onclick="deleteStock('${stock._id}')">Delete</button>
        <button onclick="updateStock('${stock._id}')">Update</button>
      </td>
    </tr>
  `
    )
    .join("");
}

stockForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;

  console.log("Form Data:", { name, price, category });

  try {
    const response = await fetch(`${baseUrl}/stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category }),
    });

    const result = await response.json();
    console.log("Response from Server:", result);

    if (response.ok) {
      alert("Stock added successfully!");
      stockForm.reset();
      fetchStocks();
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error creating stock:", error);
  }
});

async function deleteStock(id) {
  await fetch(`${baseUrl}/stock/${id}`, { method: "DELETE" });
  fetchStocks();
}

async function updateStock(id) {
  const name = prompt("Enter new name");
  const price = prompt("Enter new price");
  const category = prompt("Enter new category");

  if (name && price && category) {
    await fetch(`${baseUrl}/stock/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category }),
    });
    fetchStocks();
  }
}

searchBtn.addEventListener("click", async () => {
  const name = searchInput.value;
  const response = await fetch(`${baseUrl}/searchstock?name=${name}`);
  const data = await response.json();

  searchResults.innerHTML = data
    .map(
      (stock) => `
    <li>${stock.name} - ${stock.price} - ${stock.category}</li>
  `
    )
    .join("");
});

fetchStocks();
