package com.etms.EmployeeTaskManagementSystem.service;

import com.etms.EmployeeTaskManagementSystem.model.Project;
import com.etms.EmployeeTaskManagementSystem.model.User;
import com.etms.EmployeeTaskManagementSystem.repository.ProjectRepository;
import com.etms.EmployeeTaskManagementSystem.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

//    public Project createProject(Project project) {
//        return projectRepository.save(project);
//    }

    public Project createProject(Project project, String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        project.setManager(manager);
        return projectRepository.save(project);
    }
    public Project updateProject(Project project) {
        return projectRepository.save(project); // save() updates if ID exists
    }

    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
   
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
