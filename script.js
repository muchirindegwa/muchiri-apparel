document.getElementById("copyright-year").innerHTML = `© ${new Date().getFullYear()} Muchiri's Clothing — Nairobi, Kenya`;

const YOUR_NUMBER = "254742645551";
const products = [
  { id: 1, name: "Sahara Wave T-Shirt", price: 1850, category: "T-Shirt", description: "Stunning African-inspired design with wave patterns. Perfect for casual outings." },
  { id: 2, name: "Urban Script T-Shirt", price: 1750, category: "T-Shirt", description: "Modern typography meets street style. Express yourself with this bold tee." },
  { id: 3, name: "Muchiri Logo Tee", price: 1990, category: "T-Shirt", description: "Classic Muchiri branding on premium cotton. A wardrobe essential." },
  { id: 4, name: "Coastal Breeze Hoodie", price: 3990, category: "Hoodie", description: "Breathable fabric with modern design. Great for cool weather." },
  { id: 5, name: "Midnight Hoodie", price: 4290, category: "Hoodie", description: "Premium quality hoodie perfect for night outings. Comfortable and stylish." },
  { id: 6, name: "Afro Fusion Hoodie", price: 4590, category: "Hoodie", description: "Bold African fusion design. Make a statement with this unique hoodie." },
];
const galleryImages = [
  "https://picsum.photos/id/20/300/200",
  "https://picsum.photos/id/26/300/200",
  "https://picsum.photos/id/30/300/200",
  "https://picsum.photos/id/35/300/200",
];
let cart = [];
let wishlist = [];
let currentProduct = null;

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function showToast(msg) {
  let t = document.createElement("div");
  t.innerText = msg;
  t.style.cssText =
    "position:fixed;bottom:80px;left:20px;background:#b45f2b;color:white;padding:10px 20px;border-radius:30px;z-index:9999";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

function sendWA(number, msg) {
  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
    "_blank",
  );
}

function updateCart() {
  let count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").innerText = count;
  let container = document.getElementById("cartItems");
  let totalDiv = document.getElementById("cartTotal");
  if (cart.length === 0) {
    container.innerHTML = "<p>Cart empty</p>";
    totalDiv.innerHTML = "";
    return;
  }
  let html = "",
    total = 0;
  cart.forEach((item) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `<div class="cart-item"><span>${item.name} x${item.qty}</span><span>KSh ${itemTotal} <button onclick="removeItem(${item.id})" style="background:red;padding:2px 8px;border-radius:20px;color:white;border:none;cursor:pointer;">✕</button></span></div>`;
  });
  container.innerHTML = html;
  totalDiv.innerHTML = `Total: KSh ${total}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateWishlist() {
  let count = wishlist.length;
  document.getElementById("wishlistCount").innerText = count;
  let container = document.getElementById("wishlistItems");
  if (wishlist.length === 0) {
    container.innerHTML = "<p>Wishlist empty</p>";
    return;
  }
  let html = "";
  wishlist.forEach((item) => {
    html += `<div class="wishlist-item" style="padding: 10px 0; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <p style="font-weight: bold;">${item.name}</p>
        <p style="color: #b45f2b;">KSh ${item.price}</p>
      </div>
      <div style="display: flex; gap: 5px;">
        <button onclick="addToCart({id: ${item.id}, name: '${item.name}', price: ${item.price}})" style="background: #27ae60; padding: 5px 10px; border-radius: 15px; border: none; color: white; cursor: pointer;">Add</button>
        <button onclick="removeFromWishlist(${item.id})" style="background: red; padding: 5px 10px; border-radius: 15px; border: none; color: white; cursor: pointer;">✕</button>
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

window.addToCart = function (p) {
  let existing = cart.find((i) => i.id === p.id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  saveCart();
  updateCart();
  showToast(`${p.name} added`);
};

window.removeItem = function (id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCart();
  showToast("Removed from cart");
};

window.addToWishlist = function (p) {
  let existing = wishlist.find((i) => i.id === p.id);
  if (!existing) {
    wishlist.push(p);
    saveWishlist();
    updateWishlist();
    showToast(`${p.name} added to wishlist ❤️`);
  } else {
    showToast(`${p.name} already in wishlist`);
  }
};

window.removeFromWishlist = function (id) {
  wishlist = wishlist.filter((i) => i.id !== id);
  saveWishlist();
  updateWishlist();
  showToast("Removed from wishlist");
};

function checkout() {
  if (cart.length === 0) {
    showToast("Cart empty");
    return;
  }
  let phone = prompt("📱 Your M-Pesa phone number:");
  if (!phone || phone.length < 9) {
    showToast("Valid phone required");
    return;
  }
  let total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let items = cart
    .map((i) => `${i.name} x${i.qty} = KSh ${i.price * i.qty}`)
    .join("\n");
  let orderId = "ORD-" + Date.now();
  let orders = JSON.parse(localStorage.getItem("muchiri_orders") || "[]");
  orders.push({
    id: orderId,
    phone: phone,
    total: total,
    items: items,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("muchiri_orders", JSON.stringify(orders));
  sendWA(
    phone.replace(/^0/, ""),
    `🏪 MUCHIRI'S - ORDER #${orderId}\nTotal: KSh ${total}\n\n💰 Send KSh ${total} to 0742645551`,
  );
  sendWA(
    YOUR_NUMBER,
    `🛍️ NEW ORDER #${orderId}\nPhone: ${phone}\nTotal: KSh ${total}\nItems:\n${items}`,
  );
  cart = [];
  saveCart();
  updateCart();
  document.getElementById("cartSidebar").classList.remove("open");
  showToast("✅ Order placed! Check WhatsApp");
}

function sendContact() {
  let n = document.getElementById("contactName").value;
  let e = document.getElementById("contactEmail").value;
  let m = document.getElementById("contactMsg").value;
  if (!n || !e || !m) {
    document.getElementById("contactFeedback").innerHTML = "⚠️ Fill all fields";
    return;
  }
  let contacts = JSON.parse(localStorage.getItem("muchiri_contacts") || "[]");
  contacts.push({
    name: n,
    email: e,
    message: m,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("muchiri_contacts", JSON.stringify(contacts));
  sendWA(
    YOUR_NUMBER,
    `📩 Contact\nName: ${n}\nEmail: ${e}\nMessage: ${m}`,
  );
  document.getElementById("contactFeedback").innerHTML = "✅ Sent! We'll reply.";
  document.getElementById("contactName").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactMsg").value = "";
}

function sendBooking() {
  let d = document.getElementById("bookDate").value;
  let t = document.getElementById("bookTime").value;
  if (!d) {
    document.getElementById("bookFeedback").innerHTML = "⚠️ Select date";
    return;
  }
  let bookings = JSON.parse(localStorage.getItem("muchiri_bookings") || "[]");
  bookings.push({
    date: d,
    time: t,
    createdAt: new Date().toLocaleString(),
  });
  localStorage.setItem("muchiri_bookings", JSON.stringify(bookings));
  sendWA(YOUR_NUMBER, `📅 Booking\nDate: ${d}\nTime: ${t}`);
  document.getElementById("bookFeedback").innerHTML = `✅ Booked ${d} at ${t}`;
  document.getElementById("bookDate").value = "";
}

function renderProducts(filteredProducts = products) {
  document.getElementById("productGrid").innerHTML = filteredProducts
    .map(
      (p) =>
        `<div class="product-card">
          <div style="position: relative;">
            <div style="font-size:3rem;">${p.name.includes("Hoodie") ? "🧥" : "👕"}</div>
            <button onclick="addToWishlist({id: ${p.id}, name: '${p.name}', price: ${p.price}})" class="wishlist-btn" title="Add to wishlist">
              ${wishlist.find(w => w.id === p.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <h3>${p.name}</h3>
          <div class="price">KSh ${p.price}</div>
          <button onclick="openProductModal(${p.id})">👁️ View Details</button>
          <button onclick="addToCart({id: ${p.id}, name: '${p.name}', price: ${p.price}})">🛒 Add to Cart</button>
        </div>`
    )
    .join("");
}

function openProductModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;
  
  document.getElementById("modalProductImage").innerHTML = currentProduct.name.includes("Hoodie") ? "🧥" : "👕";
  document.getElementById("modalProductName").innerHTML = currentProduct.name;
  document.getElementById("modalProductPrice").innerHTML = `KSh ${currentProduct.price}`;
  document.getElementById("modalProductDesc").innerHTML = currentProduct.description;
  document.getElementById("modalProductDetails").innerHTML = `<strong>Category:</strong> ${currentProduct.category}`;
  
  let inWishlist = wishlist.find(w => w.id === currentProduct.id);
  document.getElementById("modalAddToWishlistBtn").innerHTML = inWishlist ? '❤️ In Wishlist' : '❤️ Add to Wishlist';
  document.getElementById("modalAddToWishlistBtn").style.background = inWishlist ? '#c0392b' : '#e74c3c';
  
  document.getElementById("modalAddToCartBtn").onclick = () => {
    addToCart({id: currentProduct.id, name: currentProduct.name, price: currentProduct.price});
    closeProductModal();
  };
  
  document.getElementById("modalAddToWishlistBtn").onclick = () => {
    addToWishlist(currentProduct);
  };
  
  document.getElementById("productModal").style.display = "block";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

function renderGallery() {
  document.getElementById("galleryGrid").innerHTML = galleryImages
    .map(
      (img) =>
        `<div class="gallery-card"><img src="${img}"><p style="margin-top:10px;">Streetwear Look</p></div>`,
    )
    .join("");
}

// SEARCH & FILTER FUNCTIONALITY
function searchProducts() {
  let searchTerm = document.getElementById("searchInput").value.toLowerCase();
  let category = document.getElementById("categoryFilter").value;
  
  let filtered = products.filter(p => {
    let matchesSearch = p.name.toLowerCase().includes(searchTerm);
    let matchesCategory = category === "" || p.category === category;
    return matchesSearch && matchesCategory;
  });
  
  renderProducts(filtered);
  
  let resultText = "";
  if (searchTerm || category) {
    resultText = `Found ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
  }
  document.getElementById("searchResults").innerHTML = resultText;
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "";
  renderProducts(products);
  document.getElementById("searchResults").innerHTML = "";
}

// THEME FUNCTIONALITY
let savedTheme = localStorage.getItem("theme");
let themeBtn = document.getElementById("themeBtn");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerHTML = "☀️";
}
themeBtn.onclick = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = "🌙";
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = "☀️";
  }
};

// CART & WISHLIST INITIALIZATION
let savedCart = localStorage.getItem("cart");
if (savedCart) cart = JSON.parse(savedCart);

let savedWishlist = localStorage.getItem("wishlist");
if (savedWishlist) wishlist = JSON.parse(savedWishlist);

// EVENT LISTENERS
document.getElementById("cartBtn").onclick = () =>
  document.getElementById("cartSidebar").classList.add("open");
document.getElementById("closeCartBtn").onclick = () =>
  document.getElementById("cartSidebar").classList.remove("open");

document.getElementById("wishlistBtn").onclick = () =>
  document.getElementById("wishlistSidebar").classList.add("open");
document.getElementById("closeWishlistBtn").onclick = () =>
  document.getElementById("wishlistSidebar").classList.remove("open");

document.getElementById("checkoutBtn").onclick = checkout;
document.getElementById("sendMsgBtn").onclick = sendContact;
document.getElementById("bookBtn").onclick = sendBooking;

// SEARCH EVENT LISTENERS
document.getElementById("searchInput").addEventListener("keyup", searchProducts);
document.getElementById("categoryFilter").addEventListener("change", searchProducts);

// MODAL CLOSE ON OUTSIDE CLICK
window.onclick = function(event) {
  let modal = document.getElementById("productModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// INITIALIZE
renderProducts();
renderGallery();
updateCart();
updateWishlist();
window.scrollTo = scrollTo;
showToast("✅ Muchiri's Clothing is LIVE!");
