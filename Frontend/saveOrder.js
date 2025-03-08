function saveOrder(cartItems) {
    let fullName = document.querySelector('input[placeholder="Enter your full name"]').value.trim();
    let phone = document.querySelector('input[placeholder="Enter your phone number"]').value.trim();
    let address = document.querySelector('input[placeholder="Enter your address"]').value.trim();
    let country = document.querySelector('select[name="country"]').value.trim();
    let city = document.querySelector('select[name="city"]').value.trim();

    if (!fullName || !phone || !address || country === "" || city === "") {
        alert("⚠️ Please fill in all required details before proceeding!");
        return;
    }

    // Calculate total price
    let totalPrice = cartItems.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    // Create new order object
    let newOrder = {
        name: fullName,
        phone: phone,
        address: `${address}, ${city}, ${country}`,
        items: cartItems,
        total: totalPrice.toFixed(2),
        timestamp: new Date().toLocaleString()
    };

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`✅ Order placed successfully!\n\nThank you, ${fullName}! Your order will be shipped to ${address}, ${city}, ${country}.`);
    
    // Clear cart after checkout
    localStorage.removeItem("cart");
    document.querySelector('.returnCart .list').innerHTML = "<p>No items in the cart.</p>";
}
