document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const roleBtns = document.querySelectorAll(".role-btn");
  const passwordGroup = document.getElementById("passwordGroup");
  const identifierLabel = document.getElementById("identifierLabel");
  const identifierInput = document.getElementById("identifier");
  const errorMessage = document.getElementById("errorMessage");

  let currentRole = "student";

  // Role selection handling
  roleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      roleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update form based on role
      currentRole = btn.dataset.role;
      if (currentRole === "student") {
        passwordGroup.style.display = "none";
        identifierLabel.textContent = "Roll Number";
        identifierInput.placeholder = "22F-XXXX";
      } else {
        passwordGroup.style.display = "block";
        identifierLabel.textContent = "Username";
        identifierInput.placeholder = "Enter username";
      }

      // Clear any existing error messages
      hideError();
    });
  });

  // Error handling functions
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  function hideError() {
    errorMessage.style.display = "none";
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifier = identifierInput.value.trim();
    const password = document.getElementById("password").value;
    let response
    try {
      if (currentRole === "student") {
        // Validate student roll number format
        const rollNumberPattern = /^\d{2}K-\d{4}$/;
        if (!rollNumberPattern.test(identifier)) {
          throw new Error("Invalid roll number format. Use pattern: 22F-XXXX");
        }
        console.log("here")
        response = await fetch("http://localhost:5000/api/student/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id:identifier,
          }),
        });
      } else {
        // Validate admin credentials
        console.log(identifier, password)
        if (!identifier || !password) {
          throw new Error("Username and password are required");
        }
        response = await fetch("http://localhost:5000/api/admin/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username:identifier,
            password
          }),
        });
      }

      console.log(response);
      if (response.status === 200) {
        // Redirect to dashboard
        window.location.href = `/dashboard`;
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      showError(error.message);
    }
  });

});
