package com.phoenix.phoenix.repository;

import com.phoenix.phoenix.entity.Reso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResoRepository extends JpaRepository<Reso,Long> {

}
