package bd.ac.bracu.cse391.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "academic_schedule_courses")
public class AcademicCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String semester;

    @Column(name = "course_code", nullable = false, length = 40)
    private String courseCode;

    @Column(name = "course_title", nullable = false, length = 160)
    private String courseTitle;

    @Column(name = "domain_focus", nullable = false, length = 100)
    private String domainFocus;

    @Column(name = "key_outcomes", nullable = false, columnDefinition = "TEXT")
    private String keyOutcomes;

    @Column(nullable = false)
    private Integer credits = 3;

    @Column(nullable = false, length = 40)
    private String status;

    public AcademicCourse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }
    public String getDomainFocus() { return domainFocus; }
    public void setDomainFocus(String domainFocus) { this.domainFocus = domainFocus; }
    public String getKeyOutcomes() { return keyOutcomes; }
    public void setKeyOutcomes(String keyOutcomes) { this.keyOutcomes = keyOutcomes; }
    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
