package com.example.user_service.repository;

import com.example.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	// Find user by username (used for login, authentication, etc.)
	Optional<User> findByUsername(String username);
	
	// Check if username already exists (used for registration validation)
    boolean existsByUsername(String username);
}

