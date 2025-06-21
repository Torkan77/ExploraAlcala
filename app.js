import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyALivXDLQfEj0IdFiThzEz4ytrycA5shkY",
  authDomain: "exploraalcala.firebaseapp.com",
  projectId: "exploraalcala",
  storageBucket: "exploraalcala.firebasestorage.app",
  messagingSenderId: "1013863765023",
  appId: "1:1013863765023:web:7e66ee23627340d3df712a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, "experiencias");

const lista = document.getElementById("lista");
const form = document.getElementById("form");

function renderizar(doc) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${doc.titulo}</strong> en <em>${doc.lugar}</em><br>${doc.descripcion}`;
  lista.appendChild(li);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nueva = {
    titulo: document.getElementById("titulo").value,
    lugar: document.getElementById("lugar").value,
    descripcion: document.getElementById("descripcion").value,
  };
  try {
    await addDoc(col, nueva);
    form.reset();
  } catch (err) {
    alert("No tienes permisos para subir experiencias.");
  }
});

onSnapshot(col, (snapshot) => {
  lista.innerHTML = "";
  snapshot.forEach(doc => renderizar(doc.data()));
});
