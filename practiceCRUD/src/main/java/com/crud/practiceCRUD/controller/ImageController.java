package com.crud.practiceCRUD.controller;

import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.crud.practiceCRUD.entity.Image;
import com.crud.practiceCRUD.service.EmployeeService;
import com.crud.practiceCRUD.service.ImageService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	@Autowired
	private EmployeeService employeeService;
	
	  @Autowired
	  private ImageService imageService;
	  @PostMapping("/upload/{id}")
	  public String uploadImage(@RequestParam("file") MultipartFile file,@PathVariable Long id) {
	    try {
	    	if(!employeeService.existByEmployee(id)) {
	    		return " invalid" ;
	    	}
	    		
	    	imageService.uploadImage(file,id);
	    } catch (IOException e) {
	      e.printStackTrace();
	    }
	    return "uploadForm";
	  }
	  
	  @GetMapping("/{id}")
	  public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
	      Optional<Image> optionalImage = imageService.getImageByEmployeeId(id);
	      if (optionalImage.isPresent()) {
	          Image image = optionalImage.get();
	          return ResponseEntity.ok()
	                  .contentType(MediaType.IMAGE_JPEG) // Set the appropriate content type for your image (e.g., MediaType.IMAGE_PNG)
	                  .body(image.getImage());
	      } else {
	          return ResponseEntity.notFound().build();
	      }
	  }
}
