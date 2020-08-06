package com.example.demo.repository;

import com.example.demo.model.PendingHost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingHostRepository extends JpaRepository<PendingHost, Long> {
}
