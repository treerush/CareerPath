// role-router.js (ES module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* --- Firebase config --- */
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

/* --- Sozlamalar --- */
const EMPLOYER_URL = "ish-beruvchi-dashboard.html";
const USER_URL = "jobs.html";

/* Normalize qiluvchi */
function normalizeHref(h) {
  if (!h) return "";
  return h.replace(/^\.\//, "").replace(/^\//, "").split(/[?#]/)[0];
}

/* Firestore'dan role olish + cache */
async function getRole(uid) {
  try {
    const cached = localStorage.getItem("cp_role_for_" + uid);
    if (cached) return cached;

    const snap = await getDoc(doc(db, "users", uid));
    const role = snap.exists() ? (snap.data().role || snap.data().userType || "user") : "user";
    localStorage.setItem("cp_role_for_" + uid, role);
    return role;
  } catch (err) {
    console.error("role-router: getRole error", err);
    return "user";
  }
}

/* Anchorlarni yangilash (exist qilganlarini) */
function applyLinksForRole(role) {
  const target = role === "employer" ? EMPLOYER_URL : USER_URL;
  console.log("[role-router] apply role:", role, "->", target);

  // yangilash: barcha <a> larni tekshiradi va keraklisini yangilaydi
  document.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href") || "";
    const norm = normalizeHref(href);
    const isJobsAnchor =
      a.dataset.jobsLink !== undefined ||
      norm === "jobs.html" ||
      norm === "pages/jobs.html" ||
      href.includes("jobs.html") ||
      /\/jobs(\/|$)/.test(href);

    if (isJobsAnchor) {
      a.setAttribute("href", target);
      // accessibility: aria-role qoladi
    }
  });
}

/* Delegatsiya: document darajasida bosilishni ushlab, doim to'g'ri manzilga yo'naltiradi */
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  const norm = normalizeHref(href);
  const isJobsAnchor =
    a.dataset.jobsLink !== undefined ||
    norm === "jobs.html" ||
    norm === "pages/jobs.html" ||
    href.includes("jobs.html") ||
    /\/jobs(\/|$)/.test(href);

  if (!isJobsAnchor) return;

  // role-ni localStorage yoki defaultdan olamiz
  let role = localStorage.getItem("cp_role") || localStorage.getItem("cp_role_for_" + localStorage.getItem("cp_uid")) || "user";
  const target = role === "employer" ? EMPLOYER_URL : USER_URL;

  // agar allaqachon o'sha sahifada bo'lsak, hech nima qilmaymiz
  if (normalizeHref(window.location.pathname).endsWith(normalizeHref(target))) return;

  e.preventDefault();
  window.location.href = target;
});

/* MutationObserver: dinamik qo'shilgan linklar uchun */
const mo = new MutationObserver((mutations) => {
  const cachedRole = localStorage.getItem("cp_role");
  if (cachedRole) applyLinksForRole(cachedRole);
});
mo.observe(document.body, { childList: true, subtree: true });

/* Kech (agar cache bo'lsa darhol qo'llash) */
const cachedRole = localStorage.getItem("cp_role");
if (cachedRole) applyLinksForRole(cachedRole);

/* Auth o'zgarganda rolni yangilash va linkslarni qo'llash */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("[role-router] user not logged in");
    return;
  }
  localStorage.setItem("cp_uid", user.uid);
  const role = await getRole(user.uid);
  localStorage.setItem("cp_role", role);
  applyLinksForRole(role);
});
