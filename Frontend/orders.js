async function loadOrders() {
    let ordersList = document.getElementById("ordersList");
    ordersList.innerHTML = "";

    try {
        let response = await fetch("http://localhost:5000/api/orders");
        let orders = await response.json();

        if (orders.length === 0) {
            ordersList.innerHTML = "<p>No orders found.</p>";
            return;
        }

        orders.forEach(order => {
            let orderItem = document.createElement("div");
            orderItem.classList.add("orderItem");
            orderItem.innerHTML = `
                <h3>Order</h3>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Total Price:</strong> $${order.total}</p>
                <p><strong>Order Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
                <button onclick="deleteOrder('${order._id}')">Delete Order</button>
            `;
            ordersList.appendChild(orderItem);
        });
    } catch (error) {
        console.error("Error loading orders:", error);
    }
}

async function deleteOrder(orderId) {
    try {
        await fetch(`http://localhost:5000/api/orders/${orderId}`, { method: "DELETE" });
        loadOrders();
    } catch (error) {
        console.error("Error deleting order:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadOrders);
