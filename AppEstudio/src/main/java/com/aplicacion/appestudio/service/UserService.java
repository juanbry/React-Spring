package com.aplicacion.appestudio.service;

import com.aplicacion.appestudio.model.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    void save(User user);
    boolean checkPassword(User user, String rawPassword);
}
