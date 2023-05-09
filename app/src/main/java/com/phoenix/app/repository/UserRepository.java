package com.phoenix.app.repository;

import com.phoenix.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    //questa classe permette di accedere alle JPAREPOSITORY a tutte le classi che la includono.
}
