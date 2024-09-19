package com.www.triptrav.controller;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    // 로그인 처리
//    @PostMapping("/login")
//    @ResponseBody
//    public String loginUser(@RequestBody UserVO uvo, HttpSession session) {
//        log.info("로그인 시도 이메일 >>> {}", uvo.getEmail());
//
//        UserVO user = usv.checkEmail(uvo.getEmail());
//        if (user == null) {
//            log.info("유저 없음!! >>>>>: {}", uvo.getEmail());
//            return "fail";
//        }
//
//        if (passwordEncoder.matches(uvo.getPw(), user.getPw())) {
//            session.setAttribute("user", user);
//            log.info("로그인 success Msg {} >>>> ", user.getEmail());
//            return "success";
//        } else {
//            log.info("비밀번호 불일치 >>> {}", uvo.getEmail());
//            return "fail";
//        }
//    }



}
