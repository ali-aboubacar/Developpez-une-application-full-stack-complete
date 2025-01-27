package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.ETheme;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/subscribe/{themeId}")
    public ResponseEntity<?> subscribeToTheme(@PathVariable("themeId") long themeId){
        try{
            userService.subscribeToTheme(themeId);
            return new ResponseEntity<>(new MessageResponse("Subscribed Successfully !"),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/unsubscribe/{themeId}")
    public ResponseEntity<?> unSubscribeToTheme(@PathVariable("themeId") long themeId){
        try{
            userService.unSubscribeToTheme(themeId);
            return new ResponseEntity<>(new MessageResponse("Unsubscribed Successfully !"),HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/currentuser")
    public ResponseEntity<?> getCurrentUser(){
        try{
            userService.getCurrentUser();
            return new ResponseEntity<>(userService.getCurrentUser(),HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
