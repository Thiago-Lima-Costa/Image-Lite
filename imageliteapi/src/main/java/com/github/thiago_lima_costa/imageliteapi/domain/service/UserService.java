package com.github.thiago_lima_costa.imageliteapi.domain.service;

import com.github.thiago_lima_costa.imageliteapi.domain.AccessToken;
import com.github.thiago_lima_costa.imageliteapi.domain.entity.User;

public interface UserService {

    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
