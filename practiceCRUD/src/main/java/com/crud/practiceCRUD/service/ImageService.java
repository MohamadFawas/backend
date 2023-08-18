package com.crud.practiceCRUD.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.crud.practiceCRUD.entity.Image;

import java.util.Optional;

public interface ImageService {
	public void uploadImage(MultipartFile file,Long id) throws IOException;
	  
	  public Optional<Image> getImageByEmployeeId(Long id);

	
	
}
