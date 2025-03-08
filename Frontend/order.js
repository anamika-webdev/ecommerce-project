document.addEventListener("DOMContentLoaded", loadOrders);

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders found.</p>";
        return;
    }

    orders.forEach((order, index) => {
        let orderItem = document.createElement("div");
        orderItem.classList.add("orderItem");
        orderItem.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Total Price:</strong> $${order.total}</p>
            <p><strong>Order Date:</strong> ${order.timestamp}</p>
            <h4>Items:</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name} - ${item.quantity} x $${item.price}</li>`).join('')}
            </ul>
            <button onclick="deleteOrder(${index})">Delete Order</button>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Delete an order
function deleteOrder(index) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

// Ensure admin access
function checkAdmin() {
    let isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
        window.location.href = "login.html"; // Redirect to login
    }
}

document.addEventListener("DOMContentLoaded", checkAdmin);
