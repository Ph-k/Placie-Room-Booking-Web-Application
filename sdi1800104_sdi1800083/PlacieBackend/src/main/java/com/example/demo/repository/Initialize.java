package com.example.demo.repository;

import com.example.demo.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@Slf4j
class Initialize {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    Initialize(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository repository) {
        return args -> {
            if(repository.findByUsername("admin")==null){
                repository.save(new User("admin",
                        bCryptPasswordEncoder.encode("admin")
                        ,"admin","admin","admin@placie.di.com",
                        "+30 2107275161",null,true,true,true));
            }
        };
    }
}
