package com.devcoders.empmanagementsystem.service;

import com.devcoders.empmanagementsystem.model.Employee;
import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    Employee getEmployeeById(Long id);
    List<Employee> getAllEmployees();
    Employee getEmployeeByEmail(String email);
} 