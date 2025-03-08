document.getElementById("loginBtn").addEventListener("click", () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        alert("Invalid Credentials!");
    }
});

// Restrict unauthorized access to admin pages
function checkAdmin() {
    let isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
        window.location.href = "login.html"; // Redirect to login
    }
}
