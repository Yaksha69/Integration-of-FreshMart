document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const errorMessage = document.getElementById("errorMessage");

            try {
                const response = await fetch("http://127.0.0.1:3000/api/v1/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    errorMessage.innerText = data.message || "Login failed!";
                    return;
                }

                alert("Login successful!");
                window.location.href = "../index.html"; // Redirect to homepage

            } catch (error) {
                errorMessage.innerText = "Network error, please try again!";
                console.error("Login Error:", error);
            }
        });
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const userLevel = document.getElementById("userLevel").value;
            const errorMessage = document.getElementById("errorMessage");

            try {
                const response = await fetch("http://127.0.0.1:3000/api/v1/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, userLevel })
                });

                const data = await response.json();

                if (!response.ok) {
                    errorMessage.innerText = data.message || "Registration failed!";
                    return;
                }

                alert("Registration successful! You can now log in.");
                window.location.href = "index.html"; // Redirect to login page

            } catch (error) {
                errorMessage.innerText = "Network error, please try again!";
                console.error("Registration Error:", error);
            }
        });
    }
});

