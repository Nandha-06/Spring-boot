import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Typography,
    Box
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await api.getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error loading employees:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.deleteEmployee(id);
                loadEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Employee List</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/employees/new')}
                >
                    Add New Employee
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => navigate(`/employees/${employee.id}`)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(employee.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EmployeeList; 