package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    @Autowired
    ThemeMapper themeMapper;
    public UserDto toUserDto(User user){
        if (user == null){
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setProfil(user.getProfil());
        userDto.setThemes(user.getThemes().stream().map(themeMapper::toThemeDto).collect(Collectors.toList()));
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        return userDto;
    }
}
