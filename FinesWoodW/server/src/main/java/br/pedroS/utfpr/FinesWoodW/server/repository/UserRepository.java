package br.pedroS.utfpr.FinesWoodW.server.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.pedroS.utfpr.FinesWoodW.server.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // select * from tb_user where username=:username
    User findByEmail(String email);
}
