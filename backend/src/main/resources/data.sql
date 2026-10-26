INSERT IGNORE INTO skill_endorsements (id, category, skill_name, proficiency_level, endorsements) VALUES
(1, 'Languages', 'Python', 'Advanced', 28),
(2, 'Languages', 'C++', 'Advanced', 24),
(3, 'Languages', 'JavaScript (ES6+)', 'Advanced', 19),
(4, 'Languages', 'TypeScript', 'Intermediate', 16),
(5, 'Languages', 'HTML5 & CSS3', 'Advanced', 22),
(6, 'Frameworks', 'Spring Boot + MySQL', 'Advanced', 25),
(7, 'Frameworks', 'React + Vite', 'Intermediate', 18),
(8, 'Frameworks', 'Angular', 'Intermediate', 15),
(9, 'Security & OS', 'Kali Linux & Red Teaming', 'Advanced', 31),
(10, 'Security & OS', 'Mobile App Penetration Testing', 'Intermediate', 17);

INSERT IGNORE INTO academic_schedule_courses (id, semester, course_code, course_title, domain_focus, key_outcomes, credits, status) VALUES
(1, '4th Year (Current)', 'CSE 391', 'Programming for the Internet', 'Full-Stack Web Engineering', 'Semantic XHTML/HTML5, responsive CSS3 architecture, JavaScript DOM engineering, Spring Boot + React + MySQL integration, and W3C standards compliance.', 3, 'In Progress'),
(2, '4th Year (Current)', 'CSE 400', 'Undergraduate Thesis Research', 'Deep Learning & Computer Vision', 'Benchmarking NeRF variants & 3D Gaussian Splatting across aerial/ground datasets, plus lightweight multi-seed polyp segmentation networks.', 4, 'Ongoing'),
(3, '3rd Year', 'CSE 370', 'Database Systems', 'Relational Schema & SQL Security', 'Built the Integrated Crime Investigation & Criminal Database System (ICICIDS) with parameterized queries to prevent SQL injection attacks.', 3, 'Completed'),
(4, '3rd Year', 'CSE 423', 'Computer Graphics', '3D Rendering & Shaders', 'Developed an interactive 3D graphics engine utilizing matrix transformations, custom shaders, and virtual filesystem utilities in C and Python.', 3, 'Completed');
