CareerPath - AI Maslahatchi
Loyiha haqida

CareerPath — bu IT sohasidagi yosh mutaxassislar va dasturchilar uchun mo‘ljallangan AI maslahatchi platformasi.
Loyihaning asosiy maqsadi — foydalanuvchilarga karyera rivoji, ish joyidagi psixologik holat, motivatsiya va shaxsiy taraqqiyot bo‘yicha shaxsiylashtirilgan maslahatlar berishdir.

Asosiy funksiyalar 🚀

AI bilan suhbat: Foydalanuvchi-do‘st interfeysga ega chat orqali AI bilan muloqot qilish.

IT psixologi roli: AI faqat IT sohasi uchun ixtisoslashgan maslahatlar beradi.

Uzluksiz suhbat: Suhbat tarixi saqlanib boradi, AI oldingi muloqotlarni eslab qoladi.

Yuklanish animatsiyasi: AI javobini kutish jarayonida foydalanuvchiga qulay vizual tajriba yaratadi.

Ishga tushirish ⚙️

Loyiha frontend va backend qismlariga ega bo‘lib, ular birgalikda ishlaydi.

Oldindan kerak bo‘ladiganlar:

Node.js
 (18.x yoki undan yuqori versiya)

Vercel
 hisobi

Google AI Studio
 orqali olingan Gemini API kaliti

O‘rnatish bosqichlari:

Loyihani kompyuteringizga klonlang:

git clone [repozitoriy_havolasi]


Loyiha papkasiga o‘ting:

cd [proyekt_nomi]


api papkasida kerakli kutubxonalarni o‘rnating:

npm install @google/generative-ai


Vercel CLI ni o‘rnating:

npm install -g vercel


Vercel hisobingizga kiring:

vercel login

Vercel konfiguratsiyasi 🔑

Vercel loyihangizda Environment Variables bo‘limiga o‘ting.

Yangi o‘zgaruvchi qo‘shing:

Name: GEMINI_API_KEY

Value: Google AI Studio’dan olgan haqiqiy API kalitingiz.

Deploy qilish 🚀

Loyihani Vercelga joylashtirish:

vercel deploy


Production rejimida joylashtirish:

vercel --prod

Foydalanish 🧑‍💻

Joylashtirishdan so‘ng Vercel sizga veb-manzil beradi. Shu manzil orqali platformaga kirib, IT sohasiga oid savollarni AI maslahatchidan so‘rashingiz mumkin.

Texnologiyalar 🛠

Frontend: HTML, CSS, JavaScript (Vanilla JS)

Backend (Serverless): Node.js

AI modeli: Google Gemini Pro

Hosting: Vercel

Loyiha tuzilishi 📂
/careerpath-project
├── api/
│   └── chat.js          # Serverless funksiya (backend)
├── aichat.html          # Chat sahifasi (frontend)
├── dashboard.html       # Bosh sahifa
└── ... (boshqa fayllar)
