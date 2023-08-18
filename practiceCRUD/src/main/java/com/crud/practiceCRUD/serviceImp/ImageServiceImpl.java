package com.crud.practiceCRUD.serviceImp;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.crud.practiceCRUD.entity.Employee;
import com.crud.practiceCRUD.entity.Image;
import com.crud.practiceCRUD.repository.EmployeeRepository;
import com.crud.practiceCRUD.repository.ImageRepository;
import com.crud.practiceCRUD.service.ImageService;
@Service
public class ImageServiceImpl implements ImageService {
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public void uploadImage(MultipartFile file,Long id) throws IOException {
		Employee employee=employeeRepository.findById(id).orElse(null);
		Image image=new Image();
		image.setEmployee(employee);
		image.setImage(file.getBytes());
		imageRepository.save(image);
		
	}

	@Override
	public Optional<Image> getImageByEmployeeId(Long id) {
		
		return imageRepository.findByEmployeeId(id);
	}
}
