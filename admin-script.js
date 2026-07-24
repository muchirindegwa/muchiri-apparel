// ==============================================
// 🔐 YOUR ADMIN PASSWORD - CHANGE THIS!
// ==============================================
const ADMIN_PASSWORD = "muchiri2025";

function login() {
  const password = document.getElementById("password").value;
  if (password === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadDashboard();
  } else {
    document.getElementById("errorMsg").innerText = "Wrong password!";
  }
}

function logout() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("password").value = "";
  document.getElementById("errorMsg").innerText = "";
}

function loadDashboard() {
  // Get data from localStorage (same data from the store)
  const orders = JSON.parse(localStorage.getItem("muchiri_orders") || "[]");
  const contacts = JSON.parse(localStorage.getItem("muchiri_contacts") || "[]");
  const bookings = JSON.parse(localStorage.getItem("muchiri_bookings") || "[]");

  // Calculate total revenue
  let totalRevenue = 0;
  orders.forEach((order) => {
    totalRevenue += order.total;
  });

  // Update stats cards
  document.getElementById("totalRevenue").innerText =
    `KSh ${totalRevenue.toLocaleString()}`;
  document.getElementById("totalOrders").innerText = orders.length;
  document.getElementById("totalMessages").innerText = contacts.length;
  document.getElementById("totalBookings").innerText = bookings.length;

  // Build orders table
  let ordersHtml = '<table class="data-table">';
  ordersHtml +=
    "<tr><th>Order ID</th><th>Phone Number</th><th>Total (KSh)</th><th>Items</th><th>Date</th></tr>";
  if (orders.length === 0) {
    ordersHtml +=
      '<tr><td colspan="5" style="text-align:center;">No orders yet</td></tr>';
  } else {
    orders.forEach((order) => {
      ordersHtml += `<tr>
        <td>${order.id}</td>
        <td>${order.phone}</td>
        <td><strong>KSh ${order.total.toLocaleString()}</strong></td>
        <td>${order.items || "View in WhatsApp"}</td>
        <td>${order.date}</td>
      </tr>`;
    });
  }
  ordersHtml += "</table>";
  document.getElementById("ordersList").innerHTML = ordersHtml;

  // Build contacts table
  let contactsHtml = '<table class="data-table">';
  contactsHtml +=
    "<tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>";
  if (contacts.length === 0) {
    contactsHtml +=
      '<tr><td colspan="4" style="text-align:center;">No messages yet</td></tr>';
  } else {
    contacts.forEach((contact) => {
      contactsHtml += `<tr>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.message.substring(0, 100)}${contact.message.length > 100 ? "..." : ""}</td>
        <td>${contact.date}</td>
      </tr>`;
    });
  }
  contactsHtml += "</table>";
  document.getElementById("contactsList").innerHTML = contactsHtml;

  // Build bookings table
  let bookingsHtml = '<table class="data-table">';
  bookingsHtml += "<tr><th>Date</th><th>Time</th><th>Booked On</th></tr>";
  if (bookings.length === 0) {
    bookingsHtml +=
      '<tr><td colspan="3" style="text-align:center;">No bookings yet</td></tr>';
  } else {
    bookings.forEach((booking) => {
      bookingsHtml += `<tr>
        <td>${booking.date}</td>
        <td>${booking.time}</td>
        <td>${booking.createdAt}</td>
      </tr>`;
    });
  }
  bookingsHtml += "</table>";
  document.getElementById("bookingsList").innerHTML = bookingsHtml;
}

function showTab(tabName) {
  // Hide all tabs
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Show selected tab
  if (tabName === "orders") {
    document.getElementById("ordersTab").classList.add("active");
    document.querySelector(".tab-btn").classList.add("active");
  } else if (tabName === "contacts") {
    document.getElementById("contactsTab").classList.add("active");
    document.querySelectorAll(".tab-btn")[1].classList.add("active");
  } else if (tabName === "bookings") {
    document.getElementById("bookingsTab").classList.add("active");
    document.querySelectorAll(".tab-btn")[2].classList.add("active");
  }
}
