document.addEventListener("DOMContentLoaded", () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function updateAdminProductList() {
        let adminProductHTML = document.getElementById('adminProducts');
        adminProductHTML.innerHTML = '';

        products.forEach((product, index) => {
            let adminProduct = document.createElement("div");
            adminProduct.classList.add("adminProduct");
            adminProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="50">
                <span>${product.name} - $${product.price}</span>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>`;
            adminProductHTML.appendChild(adminProduct);
        });

        localStorage.setItem("products", JSON.stringify(products));
    }

    // Handle Image Preview
    document.getElementById("productImage").addEventListener("change", function () {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("imagePreview").style.display = "block";
        };
        reader.readAsDataURL(this.files[0]);
    });

    // Add or Update Product
    document.getElementById("addProductBtn").addEventListener("click", () => {
        let id = document.getElementById("productId").value;
        let name = document.getElementById("productName").value.trim();
        let price = document.getElementById("productPrice").value.trim();
        let imageInput = document.getElementById("productImage");

        if (!name || !price) {
            alert("All fields are required!");
            return;
        }

        let imageUrl = document.getElementById("imagePreview").src || "images/default.jpg";

        // If editing a product
        if (id) {
            products[id] = { id: parseInt(id), name, price: parseFloat(price), image: imageUrl };
        } else {
            let newProduct = {
                id: products.length,
                name: name,
                price: parseFloat(price),
                image: imageUrl
            };
            products.push(newProduct);
        }

        localStorage.setItem("products", JSON.stringify(products));
        updateAdminProductList();
        resetForm();
    });

    // Edit Product
    window.editProduct = function (index) {
        let product = products[index];
        document.getElementById("productId").value = index;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("imagePreview").src = product.image;
        document.getElementById("imagePreview").style.display = "block";
        document.getElementById("formTitle").innerText = "Edit Product";
    };

    // Delete Product
    window.deleteProduct = function (index) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        updateAdminProductList();
    };

    // Reset Form
    function resetForm() {
        document.getElementById("productId").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productImage").value = "";
        document.getElementById("imagePreview").src = "";
        document.getElementById("imagePreview").style.display = "none";
        document.getElementById("formTitle").innerText = "Add New Product";
    }

    updateAdminProductList();
});
