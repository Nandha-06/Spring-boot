import axios from 'axios';

const API_URL = '/api';

export const api = {
    // Get all employees
    getAllEmployees: async () => {
        const response = await axios.get(`${API_URL}/employees`);
        return response.data;
    },

    // Get employee by ID
    getEmployeeById: async (id) => {
        const response = await axios.get(`${API_URL}/employees/${id}`);
        return response.data;
    },

    // Create new employee
    createEmployee: async (employee) => {
        const response = await axios.post(`${API_URL}/employees`, employee);
        return response.data;
    },

    // Update employee
    updateEmployee: async (id, employee) => {
        const response = await axios.put(`${API_URL}/employees/${id}`, employee);
        return response.data;
    },

    // Delete employee
    deleteEmployee: async (id) => {
        await axios.delete(`${API_URL}/employees/${id}`);
    }
}; 