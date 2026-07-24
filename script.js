document.getElementById("copyright-year").innerHTML = `© ${new Date().getFullYear()} Muchiri's Clothing — Nairobi, Kenya`;

const YOUR_NUMBER = "254742645551";
const products = [
  { id: 1, name: "Sahara Wave T-Shirt", price: 1850 },
  { id: 2, name: "Urban Script T-Shirt", price: 1750 },
  { id: 3, name: "Muchiri Logo Tee", price: 1990 },
  { id: 4, name: "Coastal Breeze Hoodie", price: 3990 },
  { id: 5, name: "Midnight Hoodie", price: 4290 },
  { id: 6, name: "Afro Fusion Hoodie", price: 4590 },
];
const galleryImages = [
  "https://picsum.photos/id/20/300/200",
  "https://picsum.photos/id/26/300/200",
  "https://picsum.photos/id/30/300/200",
  "https://picsum.photos/id/35/300/200",
];
let cart = [];

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
    html += `<div class="cart-item"><span>${item.name} x${item.qty}</span><span>KSh ${itemTotal} <button onclick="removeItem(${item.id})" style="background:red;padding:2px 8px;border-radius:20px;">✖</button></span></div>`;
  });
  container.innerHTML = html;
  totalDiv.innerHTML = `Total: KSh ${total}`;
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
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
  showToast("Removed");
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
  sendWA(YOUR_NUMBER, `📅 Booking\nDate: ${d}\nTime: ${t}`);
  document.getElementById("bookFeedback").innerHTML = `✅ Booked ${d} at ${t}`;
  document.getElementById("bookDate").value = "";
}
function renderProducts() {
  document.getElementById("productGrid").innerHTML = products
    .map(
      (p) =>
        `<div class="product-card"><div style="font-size:3rem;">${p.name.includes("Hoodie") ? "🧥" : "👕"}</div><h3>${p.name}</h3><div class="price">KSh ${p.price}</div><button onclick="addToCart({id:${p.id}, name:'${p.name}', price:${p.price}})">Add to Cart</button></div>`,
    )
    .join("");
}
function renderGallery() {
  document.getElementById("galleryGrid").innerHTML = galleryImages
    .map(
      (img) =>
        `<div class="gallery-card"><img src="${img}"><p style="margin-top:10px;">Streetwear Look</p></div>`,
    )
    .join("");
}
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
let savedCart = localStorage.getItem("cart");
if (savedCart) cart = JSON.parse(savedCart);
document.getElementById("cartBtn").onclick = () =>
  document.getElementById("cartSidebar").classList.add("open");
document.getElementById("closeCartBtn").onclick = () =>
  document.getElementById("cartSidebar").classList.remove("open");
document.getElementById("checkoutBtn").onclick = checkout;
document.getElementById("sendMsgBtn").onclick = sendContact;
document.getElementById("bookBtn").onclick = sendBooking;
renderProducts();
renderGallery();
updateCart();
window.scrollTo = scrollTo;
showToast("✅ Muchiri's Clothing is LIVE!");
