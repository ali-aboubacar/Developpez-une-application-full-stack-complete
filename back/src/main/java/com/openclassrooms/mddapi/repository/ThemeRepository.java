package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.ETheme;
import com.openclassrooms.mddapi.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findByName(ETheme name);
}
