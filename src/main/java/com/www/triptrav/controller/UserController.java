package com.www.triptrav.controller;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user/*")
@RequiredArgsConstructor
@Slf4j
@Controller
public class UserController {

    private final UserService usv;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/join")
    public String joinUser(UserVO uvo, Model m){
        log.info("user join start!");
        log.info("join user >>> {}", uvo);
        uvo.setPw(passwordEncoder.encode(uvo.getPw()));
        usv.joinUser(uvo);
        m.addAttribute("joinMsg","가입이 완료되었습니다!");
        return "redirect:/?joinMsg=true";
    }

    @GetMapping("/login")
    public void loginUser(){
    }


    @GetMapping("/join")
    public void joinUser(){
    }

    @PostMapping(value="/nick",consumes = "text/plain", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> duplicationNick(@RequestBody String nickName){
        int isOk = usv.duplicationNick(nickName);
        return isOk==0? new ResponseEntity<String>("0", HttpStatus.OK):
                new ResponseEntity<String>("1",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value="/email",consumes = "text/plain", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> duplicationEmail(@RequestBody String email){
        log.info("email>>>>{}",email);
        int isOk = usv.duplicationEmail(email);
        return isOk==0? new ResponseEntity<String>("0", HttpStatus.OK):
                new ResponseEntity<String>("1",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
