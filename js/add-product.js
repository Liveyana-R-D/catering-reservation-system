import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { db } from "./firebase-config.js";

// DOM elements
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const previewImage = document.getElementById("previewImage");
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const msg = document.getElementById("msg");

// Image Preview
productImage.addEventListener("change", () => {
  const file = productImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.style.display = "none";
  }
});

async function addProduct() {
  const name = productName.value.trim();
  const description = productDescription.value.trim();
  const price = parseFloat(productPrice.value);
  const imageFile = productImage.files[0];

  if (!name || !description || !price) {
    msg.textContent = "❌ Please fill all fields correctly.";
    msg.style.color = "red";
    return;
  }

  try {
    let imageURL = "";
    if (imageFile) {
      const imageRef = ref(getStorage(), `product-images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageURL = await getDownloadURL(imageRef);
    }

    const docRef = await addDoc(collection(db, "products"), {
      name,
      description,
      price,
      imageURL
    });

    msg.textContent = "✅ Product added successfully!";
    msg.style.color = "green";
    productForm.reset();
    previewImage.style.display = "none";
  } catch (error) {
    msg.textContent = `❌ ${error.message}`;
    msg.style.color = "red";
  }
}

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});
