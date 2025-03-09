document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form refresh

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors
    console.log("Attempting login..."); // Debugging log

    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/hr/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        console.log("Response received:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            errorMessage.textContent = errorData.message || "Login failed!";
            return;
        }

        const data = await response.json();
        console.log("Login successful:", data);

        alert("Login successful!");

        // Redirect to Employee Front Page
        window.location.href = "../employee/front.html"; 

    } catch (error) {
        console.error("Network error:", error);
        errorMessage.textContent = "Network error, please try again!";
    }
});

