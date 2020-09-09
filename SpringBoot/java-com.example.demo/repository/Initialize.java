package com.example.demo.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
class Initialize {

    @Bean
    CommandLineRunner initDatabase(UserRepository repository) {
        return args -> {
            if(repository.findByUsername("admin")==null){
                repository.insertAdmin();
            }
        };
    }
}
