package com.openclassrooms.mddapi.payload.request;

import com.openclassrooms.mddapi.model.ETheme;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public class ArticleRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private Set<ETheme> theme;
}
