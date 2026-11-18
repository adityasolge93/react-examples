import { useState, useEffect } from 'react';
import axios from 'axios';

const useEmployees = () => {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [employees, setEmployees] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 1
    });

    const getEmployees = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/employee/get-all?page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`, { withCredentials: true });
            setEmployees(response.data.employees);
            setPagination(response.data.pagination);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to get employee data, refresh page to try again' });
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({
                ...prev,
                currentPage: newPage
            }));
        }
    };

    useEffect(() => {
        getEmployees();
    }, [pagination.currentPage]);

    return {
        employees, loading, errors, pagination, handlePageChange
    }
};

export default useEmployees;