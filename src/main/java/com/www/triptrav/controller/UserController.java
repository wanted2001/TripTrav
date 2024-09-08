package com.www.triptrav.controller;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

}
