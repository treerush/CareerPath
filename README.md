# CareerPath: AI-ga asoslangan kasbiy yoʻnaltirish platformasi

CareerPath — bu sunʼiy intellekt yordamida foydalanuvchilarning shaxsiy xususiyatlari va koʻnikmalariga mos keladigan kasb yoʻnalishini topishga yordam beruvchi innovatsion platforma. Loyiha maqsadi — yoshlarga va oʻz kasbini oʻzgartirmoqchi boʻlganlarga toʻgʻri yoʻnalishni tanlashda yordam berish, ularni taʼlim resurslari va ish beruvchilar bilan bogʻlash.

## Asosiy funksiyalar
- **Shaxsiyat testlari**: Foydalanuvchining kuchli tomonlarini aniqlash uchun ilmiy asoslangan testlar.
- **AI Maslahatchi**: Gemini AI yordamida kasb haqida shaxsiy maslahatlar va maʼlumotlar olish.
- **Alohida panellar**: Oddiy foydalanuvchilar uchun ish eʼlonlari sahifasi va ish beruvchilar uchun maxsus boshqaruv paneli.
- **Profilni tahrirlash**: Foydalanuvchilar oʻz profillarini toʻldirishlari, maʼlumotlarini tahrirlashlari va rasm yuklashlari mumkin.
- **Tezkor va silliq interfeys**: Barcha sahifalar tezkor va zamonaviy koʻrinishda ishlaydi.

## Ishlatilgan texnologiyalar
- **Frontend**: HTML, CSS, JavaScript (modular approach).
- **Backend**: Firebase (Authentication, Firestore Database, Storage).
- **AI**: Google Gemini API.

## Loyihani ishga tushirish
1. **Loyiha papkasini oching**: Barcha HTML fayllarni (`entrance.html`, `pages/register.html`, va boshqalar) bir papkaga joylashtiring.
2. **Firebase loyihasini sozlash**:
   - Firebase konsolida yangi loyiha yarating.
   - "Authentication" boʻlimida "Email/Password" usulini yoqing.
   - "Firestore Database" boʻlimida test rejimida yangi baza yarating.
3. **Gemini API kalitini olish**:
   - Google AI Studioʼda yangi API kalitini yarating va uni nusxalab oling.
4. **Cloudinary akkauntini sozlash**:
   - Cloudinaryʼda bepul akkaunt oching.
   - "Upload presets" boʻlimida "unsigned" turidagi yangi ruxsatnoma yarating (masalan, `careerpath`).
5. **API kalitlarini kodga joylashtirish**:
   - `register.html`, `login.html`, `dashboard.html` va `aichat.html` fayllarini oching.
   - `<script type="module">` bloki ichidagi `firebaseConfig` obyektiga Firebase'dan olgan kalitlaringizni joylashtiring.
   - `aichat.html` faylidagi `API_KEY` oʻzgaruvchisiga Gemini API kalitini kiriting.
   - `dashboard.html` faylidagi `CLOUDINARY_CLOUD_NAME` va `CLOUDINARY_UPLOAD_PRESET` qatorlarini oʻz akkaunt maʼlumotlaringizga moslang.

## Loyihani rivojlantirish uchun gʻoyalar
- **Toʻliq AI tahlil**: Test javoblariga asoslanib, aniq kasb tavsiyalarini beradigan murakkabroq AI mantiqini yaratish.
- **Yoʻl xaritasi**: Tanlangan kasb uchun bosqichma-bosqich taʼlim yoʻl xaritasi sahifasini yaratish.
- **Ish beruvchi funksiyalari**: Ish beruvchilar uchun arizalarni qabul qilish va ularni koʻrib chiqish tizimini toʻliq ishlashini taʼminlash.
## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
