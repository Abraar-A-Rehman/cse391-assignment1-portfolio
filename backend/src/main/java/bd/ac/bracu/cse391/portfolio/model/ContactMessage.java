package bd.ac.bracu.cse391.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Sender name is required")
    @Column(name = "sender_name", nullable = false, length = 120)
    private String senderName;

    @NotBlank(message = "Sender email is required")
    @Email(message = "Valid email address is required")
    @Column(name = "sender_email", nullable = false, length = 160)
    private String senderEmail;

    @NotBlank(message = "Subject is required")
    @Column(nullable = false, length = 200)
    private String subject;

    @Column(nullable = false, length = 80)
    private String category = "General Inquiry";

    @NotBlank(message = "Message body cannot be empty")
    @Column(name = "message_body", nullable = false, columnDefinition = "TEXT")
    private String messageBody;

    @Column(name = "email_dispatched", nullable = false)
    private Boolean emailDispatched = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ContactMessage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public String getSenderEmail() { return senderEmail; }
    public void setSenderEmail(String senderEmail) { this.senderEmail = senderEmail; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getMessageBody() { return messageBody; }
    public void setMessageBody(String messageBody) { this.messageBody = messageBody; }
    public Boolean getEmailDispatched() { return emailDispatched; }
    public void setEmailDispatched(Boolean emailDispatched) { this.emailDispatched = emailDispatched; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
