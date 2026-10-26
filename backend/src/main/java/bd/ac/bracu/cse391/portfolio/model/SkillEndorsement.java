package bd.ac.bracu.cse391.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_endorsements")
public class SkillEndorsement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "skill_name", nullable = false, unique = true, length = 120)
    private String skillName;

    @Column(name = "proficiency_level", nullable = false, length = 60)
    private String proficiencyLevel;

    @Column(nullable = false)
    private Integer endorsements = 0;

    public SkillEndorsement() {}

    public SkillEndorsement(Long id, String category, String skillName, String proficiencyLevel, Integer endorsements) {
        this.id = id;
        this.category = category;
        this.skillName = skillName;
        this.proficiencyLevel = proficiencyLevel;
        this.endorsements = endorsements;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }
    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
    public Integer getEndorsements() { return endorsements; }
    public void setEndorsements(Integer endorsements) { this.endorsements = endorsements; }
}
