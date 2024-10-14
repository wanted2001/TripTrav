package com.www.triptrav.config.oauth2;

import com.www.triptrav.domain.UserVO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;

@Component
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserVO user = principalDetails.getUser();

        Cookie[] cookies = request.getCookies();
        String returnUrl = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                log.info("cookie getName : " + cookie.getName());
                if (cookie.getName().equals("url")) {
                    returnUrl = cookie.getValue().split("@")[0];
                    log.info("return Url : {}", returnUrl);
                    break;
                }
            }
        }

        if (returnUrl != null && !returnUrl.isEmpty()) {
            getRedirectStrategy().sendRedirect(request, response, returnUrl);
            return;
        } else if (user.getNickname().contains("_user")) {
            response.sendRedirect("/?message=notAllowedNickName");
        } else {
            response.sendRedirect("/");
        }

    }
}
