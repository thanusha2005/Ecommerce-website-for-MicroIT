let products = [];
let cart = [];

const productGrid = document.getElementById("productGrid");
const cartBox = document.getElementById("cartBox");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(data);
  });

function renderProducts(productList) {
  productGrid.innerHTML = "";
  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <img src="${product.image}" class="h-48 mx-auto mb-2 object-contain" />
      <h2 class="font-semibold text-lg mb-1">${product.title}</h2>
      <p class="text-gray-600 mb-2">$${product.price}</p>
      <p class="text-sm text-gray-500 mb-4">${product.description.slice(0, 80)}...</p>
      <button class="bg-green-600 text-white px-4 py-2 rounded w-full" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(product) {
  cart.push(product);
  cartCount.textContent = cart.length;
  renderCart();
}

function renderCart() {
  cartBox.innerHTML = "";
  if (cart.length === 0) {
    cartBox.innerHTML = "<p class='text-gray-600'>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "flex justify-between items-center mb-2";
    cartItem.innerHTML = `
      <span class="text-sm">${item.title}</span>
      <button onclick='removeFromCart(${index})' class="text-red-500 text-sm">Remove</button>
    `;
    cartBox.appendChild(cartItem);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartCount.textContent = cart.length;
  renderCart();
}

function toggleCart() {
  cartBox.classList.toggle("hidden");
}

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(term));
  renderProducts(filtered);
});
