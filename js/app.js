// js/app.js
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// DOM elements
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("role");
const msg = document.getElementById("msg");

// Show role on register click
registerBtn.addEventListener("click", () => {
  roleSelect.style.display = "block";
});

// Handle registration
registerBtn.addEventListener("dblclick", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value;

  if (!email || !password || !role) {
    msg.textContent = "❌ Please fill all fields and choose a role.";
    msg.style.color = "red";
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      role
    });

    msg.textContent = "✅ Registered successfully!";
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = `❌ ${error.message}`;
    msg.style.color = "red";
  }
});

// Handle login
loginBtn.addEventListener("click", async () => {
  roleSelect.style.display = "none"; // Hide role selection

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    msg.textContent = "❌ Please enter email and password.";
    msg.style.color = "red";
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const docSnap = await getDoc(doc(db, "users", userCred.user.uid));

    if (docSnap.exists()) {
      const userRole = docSnap.data().role;
      msg.textContent = "✅ Login successful!";
      msg.style.color = "green";

      setTimeout(() => {
        if (userRole === "admin") {
          window.location.href = "admin-dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      }, 1000);
    } else {
      msg.textContent = "❌ User role not found.";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = `❌ ${error.message}`;
    msg.style.color = "red";
  }
});
