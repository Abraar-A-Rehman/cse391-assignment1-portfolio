CSE 391: Programming for the Internet — AI Prompts Log for Faculty Submission

Name: Abraar A Rehman  
Institution: BRAC University, Dhaka (B.Sc. in Computer Science, 4th Year)  
Course: CSE 391 — Assignment 1: Creating a Personal Web Page  
Tech Stack: Spring Boot 3.3 (Java 17) + MySQL 8 + Vite 5 + React 18 + Full Custom CSS3  

Prompt 1: Backend Prompt (Spring Boot 3 + MySQL 8 + REST API + Email Notification)

> "Act as a senior full-stack Java engineer. Build the complete Spring Boot 3.3 and MySQL 8 backend (`backend/`) for my CSE 391 Personal Webpage and Application Hub at BRAC University, personalized with my resume profile (Abraar A Rehman, 4th-year CS Undergraduate & Cyber Security Aspirant, `abrar.a.rehman@gmail.com`, Dhaka, Bangladesh).
>
> Strictly use only Spring Boot (`spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-validation`, `spring-boot-starter-mail`) and MySQL (`mysql-connector-j`). Include:
>
> 1. `pom.xml` configured for Java 17 and Spring Boot 3.3.4.
>
> 2. `application.properties` configured for MySQL database `cse391_abraar_db` (`jdbc:mysql://localhost:3306/cse391_abraar_db?createDatabaseIfNotExist=true`), JPA auto-DDL update, SQL initialization (`schema.sql` and `data.sql`), and SMTP JavaMailSender settings for `abrar.a.rehman@gmail.com`.
>
> 3. Relational MySQL schema (`schema.sql`) and seed data (`data.sql`) for three entities:
>    * `SkillEndorsement` (`skill_endorsements` table storing my technical skills in Python, C++, JavaScript, TypeScript, HTML5/CSS3, Spring Boot, React+Vite, Angular, Kali Linux, and Mobile App Penetration Testing with interactive endorsement counters).
>    * `AcademicCourse` (`academic_schedule_courses` table storing my BRAC University courses including CSE 391 Programming for the Internet, CSE 400 Undergraduate Thesis on NeRF/3D Gaussian Splatting and Cross-Dataset Polyp Segmentation, CSE 370 Database Systems / ICICIDS project, and CSE 423 Computer Graphics 3D Engine).
>    * `ContactMessage` (`contact_messages` table storing visitor inquiries from the contact form with validation annotations `@NotBlank` and `@Email`).
>
> 4. `EmailNotificationService.java` that uses `JavaMailSender` to dispatch an email notification to `abrar.a.rehman@gmail.com` whenever a visitor submits the contact form, while gracefully logging and returning a `mailto:` fallback if local SMTP credentials are not set.
>
> 5. `PortfolioController.java` with `@RestController` and CORS enabled for `http://localhost:5173` (Vite dev server) exposing:
>    * `GET /api/skills` and `POST /api/skills/{id}/endorse`
>    * `GET /api/courses`
>    * `GET /api/contact` and `POST /api/contact`"

Prompt 2: Frontend Prompt (Vite + React 18 + Full CSS3 + W3C Standards)

> "Act as a senior frontend architect. Create the complete Vite + React 18 frontend (`frontend/`) for my CSE 391 Personal Webpage connected to the Spring Boot + MySQL backend (`/api/*`), personalized for **Abraar A Rehman** based on my resume:
>
> **Structure & Navigation:**
>
> 1. Display only my name (**ABRAAR A REHMAN**) on the top-left of the sticky header without any framework badge or `#` prefixes on navigation links.
>
> 2. Implement all three navigation types in the header:
>    * **Same-page section links** (`Personal Info`, `Education Table`, `Skills`, `Links & Top 10`, `Contact Form`) to jump to sections within the same page.
>    * **Internal sub-page links** switching between internal views within the website (`Home Hub`, `Thesis & Projects` showcasing my NeRF/3DGS & Polyp Segmentation thesis and ICICIDS database system, and `Red Team & Hobbies` showcasing **Producing Music (@Inhaad_official)**, CyberWarriors League Red Team Analyst, TryHackMe, TCM Academy, BUCC Bit Battles 9th/100 teams, Project Srijon, and Blessing For Human Foundation).
>    * **Sun and Moon icon theme switcher** in the header (using only Sun and Moon icons without literal text) that switches to Day White Mode when the Sun icon is clicked and Dark Mode when the Moon icon is clicked (and vice-versa).
>
> **Hero Section, Real Photo, Motto & Social Profile Icons:**
>
> 1. Use my real portrait photo (`/assets/abraar-profile.jpg`) and display my engineering motto (`“Security is not a product, but a continuous process — and clean, resilient code is its strongest foundation.”`) directly below my profile picture without any 'inspired by' attribution, and omit any 'Personal Info & About Me' eyebrow label above my name.
>
> 2. Include clickable SVG icons for **Discord** (`https://discord.com/users/731103877369430058`), **Codeforces** (`https://codeforces.com/profile/Abraar_A_Rehman`), **LinkedIn** (`https://www.linkedin.com/in/abraar-a-rehman-4030a5354/?isSelfProfile=true`), **GitHub** (`https://github.com/Abraar-A-Rehman`), **Facebook** (`https://www.facebook.com/AbraarARehman/`), **Instagram** (`https://www.instagram.com/aksari_z1000/`), and **YouTube** (`https://www.youtube.com/@Inhaad_official`), plus embedded links to **BRAC University** (`https://www.bracu.ac.bd`) and the **CSE 391 Discord page**.
>
> 3. Include an ordered **Top 10 Favorites List** (`<ol>`) of my favorite cybersecurity books, CS texts, sci-fi movies, and music albums.
>
> **3D Interactive WebGL Scene, Black & Gold Elegance Palette, Glowing Hover Effect & Responsive Table:**
>
> 1. Make the website **3D** by integrating an interactive **Three.js (`r128`) 3D WebGL Background Scene** (rotating 3D gold wireframe icosahedron, Oxford Blue octahedron core, orbital rings, and mouse-reactive 3D starfield particles) alongside **3D CSS perspective card tilt (`perspective: 1200px`, `transform-style: preserve-3d`)** and a 3D orbital portrait showcase around my uploaded photo (`me.jpg`).
>
> 2. Apply the **Black and Gold Elegance** color palette (`#FFFFFF` Pure White, `#E5E5E5` Platinum, `#FCA311` Vibrant Gold, `#14213D` Oxford Blue, and `#000000` Pure Black) across both Dark Mode and Day White Mode.
>
> 3. Add a glowing gold hover effect when hovering over the **Technical Skills, Security Tools & Live Endorsements** section, its title, and individual skill cards.
>
> 2. Build a responsive bordered academic & research `<table>` containing multi-line paragraph descriptions, **row merging (`rowSpan="3"`)** for my BRAC University coursework/thesis entries, and **column merging (`colSpan="3"`)** for my competitive programming and Red Team summary row, alongside my HSC (BISC Dhaka, CGPA 5.00/5.00) and SSC (BAF Shaheen College, CGPA 4.78/5.00) records, with striped rows and row hover highlighting.
>
> 3. Use external (`src/App.css`), internal (`index.html`), and inline CSS appropriately, include an interactive Contact Form (`POST /api/contact`), and display `window.location.href` and `document.lastModified` in the footer via JavaScript."
