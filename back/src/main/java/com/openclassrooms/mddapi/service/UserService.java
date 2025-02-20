package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.ETheme;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class UserService {
    private final Path root = Paths.get("uploads");
    @Autowired
    UserRepository userRepository;

    @Autowired
    ThemeRepository themeRepository;
    @Autowired
    PasswordEncoder encoder;
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
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));

        Theme themeToSubscribe = themeRepository.findById(themeId).orElseThrow(() -> new ResourceNotFoundException("Theme not found" + themeId));

        user.getThemes().add(themeToSubscribe);
        themeToSubscribe.getUsers().add(user);

        themeRepository.save(themeToSubscribe);
        userRepository.save(user);
    }

    public void unSubscribeToTheme(long themeId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));

        Theme themeToUnSubscribe = themeRepository.findById(themeId).orElseThrow(() -> new ResourceNotFoundException("Theme not found" + themeId));

        user.getThemes().remove(themeToUnSubscribe);
        themeToUnSubscribe.getUsers().remove(user);

        themeRepository.save(themeToUnSubscribe);
        userRepository.save(user);
    }

    public UserDto getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
        return userMapper.toUserDto(user);
    }

    public void editUser(String email, String userName, MultipartFile img, String oldPassword, String newPassword){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found" + userId));
        if(user != null){
            if (email != null && !email.isEmpty()) user.setEmail(email);
            if (userName != null && !userName.isEmpty()) user.setName(userName);
            if (img != null) {
                String extractedUrl = extractUrl(img);
                user.setProfil(extractedUrl);
            }
            if (oldPassword !=  null && !oldPassword.isEmpty()){
                if (!encoder.matches(oldPassword,user.getPassword())){
                    throw new BadRequestException("Password doesn't match");
                }
                user.setPassword(encoder.encode(newPassword));
            }
            userRepository.save(user);
        }

    }

    /**
     * extraction de l'url de l'image.
     * @param img l'image fournie par l'utlisateur.
     * @return l'url de la location de l'image.
     */
    private String extractUrl(MultipartFile img) {
        try {
            String sanitizedFileName = img.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
            Files.copy(img.getInputStream(), this.root.resolve(sanitizedFileName));
            return "http://localhost:3002/uploads/" + sanitizedFileName;
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new BadRequestException("A file of that name already exists." + e.getMessage());
            }

            throw new RuntimeException(e.getMessage());
        }

    }
}
