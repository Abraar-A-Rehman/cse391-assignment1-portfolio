package bd.ac.bracu.cse391.portfolio.repository;

import bd.ac.bracu.cse391.portfolio.model.SkillEndorsement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillEndorsementRepository extends JpaRepository<SkillEndorsement, Long> {
}
