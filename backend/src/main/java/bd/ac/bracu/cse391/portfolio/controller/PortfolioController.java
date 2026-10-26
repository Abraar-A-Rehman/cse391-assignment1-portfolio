package bd.ac.bracu.cse391.portfolio.controller;

import bd.ac.bracu.cse391.portfolio.model.AcademicCourse;
import bd.ac.bracu.cse391.portfolio.model.ContactMessage;
import bd.ac.bracu.cse391.portfolio.model.SkillEndorsement;
import bd.ac.bracu.cse391.portfolio.repository.AcademicCourseRepository;
import bd.ac.bracu.cse391.portfolio.repository.ContactMessageRepository;
import bd.ac.bracu.cse391.portfolio.repository.SkillEndorsementRepository;
import bd.ac.bracu.cse391.portfolio.service.EmailNotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final SkillEndorsementRepository skillRepository;
    private final AcademicCourseRepository courseRepository;
    private final ContactMessageRepository contactRepository;
    private final EmailNotificationService emailService;

    public PortfolioController(
            SkillEndorsementRepository skillRepository,
            AcademicCourseRepository courseRepository,
            ContactMessageRepository contactRepository,
            EmailNotificationService emailService) {
        this.skillRepository = skillRepository;
        this.courseRepository = courseRepository;
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    @GetMapping("/skills")
    public List<SkillEndorsement> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping("/skills/{id}/endorse")
    public ResponseEntity<SkillEndorsement> endorseSkill(@PathVariable Long id) {
        return skillRepository.findById(id)
                .map(skill -> {
                    skill.setEndorsements(skill.getEndorsements() + 1);
                    return ResponseEntity.ok(skillRepository.save(skill));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/courses")
    public List<AcademicCourse> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/contact")
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContactForm(@Valid @RequestBody ContactMessage message) {
        boolean emailed = emailService.sendContactNotification(message);
        message.setEmailDispatched(emailed);
        ContactMessage saved = contactRepository.save(message);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Message saved to MySQL database and email handler triggered.");
        response.put("data", saved);
        response.put("mailtoFallback", String.format(
                "mailto:abrar.a.rehman@gmail.com?subject=%s&body=%s",
                saved.getSubject(),
                saved.getMessageBody()
        ));
        return ResponseEntity.ok(response);
    }
}
