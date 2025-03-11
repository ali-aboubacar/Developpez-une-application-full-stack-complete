package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.jwtUtils.JwtUtils;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Autowired
    UserService userService;

    @PostMapping("/subscribe/{themeId}")
    public ResponseEntity<MessageResponse> subscribeToTheme(@PathVariable("themeId") long themeId){
        userService.subscribeToTheme(themeId);
        return new ResponseEntity<>(new MessageResponse("Subscribed Successfully !"),HttpStatus.OK);
    }

    @DeleteMapping("/unsubscribe/{themeId}")
    public ResponseEntity<MessageResponse> unSubscribeToTheme(@PathVariable("themeId") long themeId){
        userService.unSubscribeToTheme(themeId);
        return new ResponseEntity<>(new MessageResponse("Unsubscribed Successfully !"),HttpStatus.OK);

    }

    @GetMapping("/currentuser")
    public ResponseEntity<UserDto> getCurrentUser(){
            UserDto currentUser = userService.getCurrentUser();
            return new ResponseEntity<>(currentUser,HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<MessageResponse> editUser(@RequestParam(value = "email",required = false) String email,
                                                    @RequestParam(value = "userName" ,required = false) String userName,
                                                    @RequestParam(value = "profil", required = false) MultipartFile profil,
                                                    @RequestParam(value = "oldPassword" ,required = false) String oldPassword,
                                                    @RequestParam(value = "newPassword" ,required = false) String newPassword){
            userService.editUser(email, userName, profil, oldPassword, newPassword);
            return new ResponseEntity<MessageResponse>(new MessageResponse("Utilisateur modifier"), HttpStatus.OK);
    }
}
