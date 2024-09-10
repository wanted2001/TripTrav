package com.www.triptrav.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                                .requestMatchers("/", "/home", "/dist/**","/plan/**","/place/**","/mypage/**").permitAll()
//                        .requestMatchers("/user/**").authenticated()
//                        .requestMatchers("/manager/**").hasAnyRole( "ADMIN")
//                        .requestMatchers("/admin/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                );
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/login")
//                        .usernameParameter("username")
//                        .passwordParameter("password")
//                        .loginProcessingUrl("/user/login")
//                        .defaultSuccessUrl("/")
//               );

        return http.build();
    }
}
