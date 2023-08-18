package com.crud.practiceCRUD.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crud.practiceCRUD.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long>{
	Optional<Image> findByEmployeeId(Long id);

}
