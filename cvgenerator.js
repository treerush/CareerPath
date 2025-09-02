import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // Firebase sozlamalari
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
    
    const userEmailDisplay = document.getElementById('user-email-display');
    const logoutLink = document.getElementById('logout-link');

    // Foydalanuvchi holatini tekshirish
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userEmailDisplay.textContent = user.email || 'Foydalanuvchi';
        } else {
            // Agar foydalanuvchi tizimga kirmagan bo'lsa, uni login sahifasiga yo'naltiramiz
            window.location.href = "login.html";
        }
    });

    // Tizimdan chiqish funksiyasi
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                window.location.href = "login.html";
            } catch (err) {
                console.error("Tizimdan chiqishda xatolik yuz berdi:", err);
            }
        });
    }

    // Menyu toggle va profil dropdown logikasi
    const menuToggle = document.getElementById('menu-toggle');
    const sideNav = document.getElementById('side-nav');
    const mainContent = document.getElementById('main-content-container');
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (menuToggle && sideNav && mainContent) {
        menuToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            mainContent.classList.toggle('menu-open');
            menuToggle.classList.toggle('active');
        });
    }
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    document.addEventListener('click', (e) => {
        if (profileBtn && !profileBtn.contains(e.target)) {
            profileDropdown.style.display = 'none';
        }
    });
    
    // CV Live Preview logikasi
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function(m) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[m];
        });
    }

    let lastPhotoDataUrl = '';
    let cvData = {
        photo: '', fullname: '', dob: '', marital: '', nationality: '',
        email: '', phone: '', location: '', linkedin: '',
        skills: '', objective: '', education: '', project: '',
        achievement: '', languages: '', interests: '', activities: '', signature: ''
    };

    function updateCVData() {
        for (let key in cvData) {
            if (key === 'photo') continue;
            let el = document.getElementById('input-' + key);
            if (el) {
                cvData[key] = escapeHTML(el.value || '');
            }
        }
        
        let skills = cvData.skills.replace(/\n/g, '<br>');
        let education = cvData.education.replace(/\n/g, '<br>');
        let project = cvData.project.replace(/\n/g, '<br>');
        let achievement = cvData.achievement.replace(/\n/g, '<br>');
        let interests = cvData.interests.replace(/\n/g, '<br>');
        let activities = cvData.activities.replace(/\n/g, '<br>');

        let photoTag = lastPhotoDataUrl ?
            `<img class="cv-profile-img" src="${lastPhotoDataUrl}" alt="Profil rasmi">` :
            `<div class="cv-profile-img"></div>`;

        let previewHtml = `
            <div class="cv-main-container" id="cv-export-content">
                <div class="cv-left-panel">
                    ${photoTag}
                    <h2>PERSONAL DETAIL</h2>
                    <div class="cv-detail">
                        Ism: <strong>${cvData.fullname}</strong><br>
                        Tug‘ilgan sana: <span>${cvData.dob}</span><br>
                        Oilaviy holat: <span>${cvData.marital}</span><br>
                        Millati: <span>${cvData.nationality}</span>
                    </div>
                    <h2>SKILL</h2>
                    <div class="cv-skill">${skills}</div>
                    <h2>CONTACT</h2>
                    <div class="cv-contact">
                        Email: ${cvData.email}<br>
                        Telefon: ${cvData.phone}<br>
                        Manzil: ${cvData.location}<br>
                        LinkedIn: <a href="${cvData.linkedin}" target="_blank" style="color: #fff; text-decoration: underline;">Profil</a>
                    </div>
                </div>
                <div class="cv-right-panel">
                    <div class="cv-section">
                        <h3>OBJECTIVE</h3>
                        <p>${cvData.objective}</p>
                    </div>
                    <div class="cv-section">
                        <h3>EDUCATION</h3>
                        <p>${education}</p>
                    </div>
                    <div class="cv-section">
                        <h3>PROJECT</h3>
                        <p>${project}</p>
                    </div>
                    <div class="cv-section">
                        <h3>ACHIEVEMENT</h3>
                        <p>${achievement}</p>
                    </div>
                    <div class="cv-section">
                        <h3>LANGUAGES</h3>
                        <p>${cvData.languages}</p>
                    </div>
                    <div class="cv-section">
                        <h3>INTERESTS</h3>
                        <p>${interests}</p>
                    </div>
                    <div class="cv-section">
                        <h3>ACTIVITIES</h3>
                        <p>${activities}</p>
                    </div>
                    <div class="cv-signature">
                        ${cvData.signature}
                    </div>
                </div>
            </div>
        `;
        document.getElementById('cv-preview').innerHTML = previewHtml;
    }

    document.querySelectorAll('#cv-form input, #cv-form textarea').forEach(el => {
        el.addEventListener('input', updateCVData);
    });

    document.getElementById('photo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                lastPhotoDataUrl = ev.target.result;
                updateCVData();
            };
            reader.readAsDataURL(file);
        } else {
            lastPhotoDataUrl = '';
            updateCVData();
        }
    });

    document.getElementById('export-pdf-btn').onclick = function() {
        updateCVData();
        let container = document.createElement('div');
        container.innerHTML = document.getElementById('cv-preview').innerHTML;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
        doc.html(container, {
            callback: function (pdf) {
                pdf.save('cv.pdf');
            },
            margin: [20, 20, 20, 20],
            x: 0,
            y: 0,
            autoPaging: 'text'
        });
    };

    document.getElementById('export-docx-btn').onclick = function() {
        updateCVData();
        const css = `
            <style>
                body { font-family: 'Poppins', Arial, sans-serif; }
                .cv-main-container { display: flex; flex-direction: row; gap: 32px; }
                .cv-left-panel { background: #2447d4; color: #fff; border-radius: 16px; padding: 24px 20px; min-width: 320px; display: flex; flex-direction: column; align-items: center; gap: 22px; }
                .cv-profile-img { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.02); background: #eee; }
                .cv-left-panel h2 { margin: 12px 0 7px 0; font-size: 1.1em; font-weight: 700; letter-spacing: 2px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 2px; }
                .cv-left-panel .cv-detail, .cv-left-panel .cv-contact, .cv-left-panel .cv-skill { font-size: 0.99em; line-height: 1.8; }
                .cv-right-panel { flex: 1; padding: 20px 30px; background: #fff; border-radius: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 18px; }
                .cv-section { margin-bottom: 11px; }
                .cv-section h3 { font-size: 1.08em; color: #2447d4; margin: 0 0 2px 0; font-weight: 600; letter-spacing: 1px; border-bottom: 1px solid rgba(36,71,212,0.1); padding-bottom: 2px; }
                .cv-section p, .cv-section ul { font-size: 0.98em; margin: 0; color: #222; }
                .cv-signature { margin-top: 22px; text-align: right; font-weight: 600; font-size: 1.02em; }
            </style>
        `;
        let fullHtml = `<!DOCTYPE html><html><head>${css}</head><body>${document.getElementById('cv-preview').innerHTML}</body></html>`;
        let blob = window.htmlDocx.asBlob(fullHtml, { orientation: 'portrait' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "cv.docx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    updateCVData();
});
