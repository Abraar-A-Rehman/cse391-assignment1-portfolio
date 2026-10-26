CREATE TABLE IF NOT EXISTS skill_endorsements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    skill_name VARCHAR(120) NOT NULL UNIQUE,
    proficiency_level VARCHAR(60) NOT NULL,
    endorsements INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS academic_schedule_courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    semester VARCHAR(80) NOT NULL,
    course_code VARCHAR(40) NOT NULL,
    course_title VARCHAR(160) NOT NULL,
    domain_focus VARCHAR(100) NOT NULL,
    key_outcomes TEXT NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    status VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(120) NOT NULL,
    sender_email VARCHAR(160) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    category VARCHAR(80) NOT NULL,
    message_body TEXT NOT NULL,
    email_dispatched BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
