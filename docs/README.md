# CSE 391 Assignment 1 — Personal Webpage & Application Hub
**Author:** Abraar A Rehman  
**University:** BRAC University, Dhaka  
**Stack:** Spring Boot 3.3 + MySQL 8 + Vite 5 + React 18 + Full CSS3  

## Project Structure
```text
cse391-abraar-portfolio/
├── backend/                  # Spring Boot 3.3 + MySQL 8 + JPA + Mail REST API
│   ├── pom.xml
│   └── src/main/
│       ├── java/bd/ac/bracu/cse391/portfolio/
│       │   ├── PortfolioApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/PortfolioController.java
│       │   ├── model/ (SkillEndorsement, AcademicCourse, ContactMessage)
│       │   ├── repository/ (JPA Repositories)
│       │   └── service/EmailNotificationService.java
│       └── resources/
│           ├── application.properties
│           ├── schema.sql
│           └── data.sql
├── frontend/                 # Vite 5 + React 18 + External/Internal/Inline CSS
│   ├── index.html            # DOCTYPE, meta tags, internal <style> block
│   ├── package.json
│   ├── vite.config.js        # Proxies /api to Spring Boot (localhost:8080)
│   ├── public/assets/        # Local images (abraar-profile.jpg, neural-security-banner.jpg)
│   └── src/
│       ├── main.jsx
│       ├── App.css           # External stylesheet (Day White/Dark mode, skills glow, striped table)
│       └── App.jsx           # Interactive React components & JS location/lastModified footer
└── prompts/
    └── AI_PROMPTS_FOR_FACULTY.md  # Complete Backend & Frontend AI Prompts for submission
```

## How to Run Locally

### 1. Start MySQL & Spring Boot Backend
1. Make sure MySQL 8 is running on `localhost:3306` and update `backend/src/main/resources/application.properties` with your MySQL username and password.
2. Start the Spring Boot server (it automatically creates `cse391_abraar_db` and seeds initial tables via `schema.sql` and `data.sql`):
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### 2. Start Vite + React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
