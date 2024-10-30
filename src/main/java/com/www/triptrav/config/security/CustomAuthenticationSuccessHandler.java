package com.www.triptrav.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectUrl = "/";
        Cookie[] cookies = request.getCookies();
        String returnUrl = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("url")) {
                    returnUrl = cookie.getValue();
                    break;
                }
            }
        }
        if (returnUrl != null && !returnUrl.isEmpty()) {
            redirectUrl = returnUrl;
        }
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

}