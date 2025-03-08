async function saveOrder(cartItems) {
    let fullName = document.querySelector('input[placeholder="Enter your full name"]').value.trim();
    let phone = document.querySelector('input[placeholder="Enter your phone number"]').value.trim();
    let address = document.querySelector('input[placeholder="Enter your address"]').value.trim();
    let country = document.querySelector('select[name="country"]').value.trim();
    let city = document.querySelector('select[name="city"]').value.trim();

    if (!fullName || !phone || !address || country === "" || city === "") {
        alert("⚠️ Please fill in all required details before proceeding!");
        return;
    }

    let orderData = {
        name: fullName,
        phone: phone,
        address: `${address}, ${city}, ${country}`,
        items: cartItems,
        total: cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0),
    };

    try {
        let response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            alert("✅ Order placed successfully!");
            localStorage.removeItem("listCart");
            document.querySelector('.returnCart .list').innerHTML = "<p>No items in the cart.</p>";
        } else {
            alert("❌ Failed to place order. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("⚠️ Server error. Please try again later.");
    }
}
