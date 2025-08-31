import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA86zhSVi4FSw-GvFBdOZsCPaHMS67XA78",
  authDomain: "carrer-path-a5810.firebaseapp.com",
  projectId: "carrer-path-a5810",
  storageBucket: "carrer-path-a5810.firebasestorage.app",
  messagingSenderId: "693831778129",
  appId: "1:693831778129:web:911293c5c284eefe295d70"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function getRole(uid) {
  const cachedUid = localStorage.getItem("cp_uid");
  const cachedRole = localStorage.getItem("cp_role");
  if (cachedUid === uid && cachedRole) return cachedRole;

  const snap = await getDoc(doc(db, "users", uid));
  const role = snap.exists() ? (snap.data().role || snap.data().userType || "user") : "user";
  localStorage.setItem("cp_uid", uid);
  localStorage.setItem("cp_role", role);
  return role;
}

function applyJobsLink(role) {
  const url = role === "employer" ? "ish-beruvchi-dashboard.html" : "jobs.html";

  const anchors = document.querySelectorAll(
    '#jobs-link, #jobs-cta-link, a[data-jobs-link], a[href="jobs.html"]'
  );
  anchors.forEach(a => {
    a.setAttribute("href", url);
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = url;
    });
  });

  const buttons = document.querySelectorAll('[data-jobs-link-button]');
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = url;
    });
  });
}

const cachedRole = localStorage.getItem("cp_role");
if (cachedRole) applyJobsLink(cachedRole);

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  const role = await getRole(user.uid);
  applyJobsLink(role);
});
