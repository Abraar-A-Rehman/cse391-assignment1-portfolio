package bd.ac.bracu.cse391.portfolio.service;

import bd.ac.bracu.cse391.portfolio.model.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${portfolio.contact.recipient:abrar.a.rehman@gmail.com}")
    private String recipientEmail;

    public boolean sendContactNotification(ContactMessage msg) {
        if (mailSender == null) {
            return false;
        }
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(recipientEmail);
            email.setReplyTo(msg.getSenderEmail());
            email.setSubject("[CSE 391 Portfolio Contact] " + msg.getSubject());
            email.setText(
                "New message submitted on Abraar A Rehman's CSE 391 Personal Webpage:\n\n" +
                "From: " + msg.getSenderName() + " <" + msg.getSenderEmail() + ">\n" +
                "Category: " + msg.getCategory() + "\n" +
                "Submitted At: " + msg.getCreatedAt() + "\n\n" +
                "Message:\n" + msg.getMessageBody()
            );
            mailSender.send(email);
            return true;
        } catch (Exception ex) {
            System.out.println("SMTP dispatch skipped or unconfigured (saved to MySQL): " + ex.getMessage());
            return false;
        }
    }
}
