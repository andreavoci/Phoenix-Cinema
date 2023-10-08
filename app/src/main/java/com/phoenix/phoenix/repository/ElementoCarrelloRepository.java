package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Carrello;
import com.phoenix.phoenix.entity.ElementoCarrello;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElementoCarrelloRepository extends JpaRepository<ElementoCarrello,Long> {

}
