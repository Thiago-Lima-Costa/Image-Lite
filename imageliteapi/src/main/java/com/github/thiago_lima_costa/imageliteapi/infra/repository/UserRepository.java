package com.github.thiago_lima_costa.imageliteapi.infra.repository;

import com.github.thiago_lima_costa.imageliteapi.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findByEmail(String email);
}
