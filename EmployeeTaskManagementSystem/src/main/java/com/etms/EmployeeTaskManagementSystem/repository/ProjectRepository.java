package com.etms.EmployeeTaskManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.etms.EmployeeTaskManagementSystem.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Later we can add custom queries if needed
}