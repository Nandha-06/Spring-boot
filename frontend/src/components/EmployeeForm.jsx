import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { createEmployee } from '../types/Employee';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(createEmployee());

    useEffect(() => {
        if (id) {
            loadEmployee();
        }
    }, [id]);

    const loadEmployee = async () => {
        try {
            const data = await api.getEmployeeById(parseInt(id));
            setEmployee(data);
        } catch (error) {
            console.error('Error loading employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.updateEmployee(parseInt(id), employee);
            } else {
                await api.createEmployee(employee);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    {id ? 'Edit Employee' : 'Add New Employee'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={employee.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={employee.dateOfBirth}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Salary"
                                name="salary"
                                type="number"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hire Date"
                                name="hireDate"
                                type="date"
                                value={employee.hireDate}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={employee.address}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {id ? 'Update' : 'Create'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default EmployeeForm; 