package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.ETheme;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ThemeRepository themeRepository;

    @Autowired
    UserMapper userMapper;
    /**
     * Verifie l'existance du nom dans le system.
     * @param name le nom a verifier.
     * @return true ou false apres verification
     */
    public Boolean findByName(String name){
        return userRepository.existsByName(name);
    }

    /**
     * Verifie l'existance de l'email dans le system.
     * @param email l'email a verifier.
     * @return true ou false apres verification
     */
    public Boolean findByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    /**
     * Creation d'un utilisateur.
     * @param user utilisateur a creer.
     * @return l'utilisateur creer.
     */
    public User createUser(User user){
        return userRepository.save(user);
    }
    /**
     * Recupere un seul utilisateur grace a son identifiant.
     * @param id l'identifiant de l'utilisateur.
     * @return un utilisateur.
     */
    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public void subscribeToTheme(long themeId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Theme themeToSubscribe = themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));

        user.getThemes().add(themeToSubscribe);
        themeToSubscribe.getUsers().add(user);

        themeRepository.save(themeToSubscribe);
        userRepository.save(user);
    }

    public void unSubscribeToTheme(long themeId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Theme themeToUnSubscribe = themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));

        user.getThemes().remove(themeToUnSubscribe);
        themeToUnSubscribe.getUsers().remove(user);

        themeRepository.save(themeToUnSubscribe);
        userRepository.save(user);
    }

    public UserDto getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toUserDto(user);
    }
}
