import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewEmployees() {
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

    return (
        <div>
            {errors?.message && (
                <div>
                    <span style={{ color: red }}>{errors.message}</span>
                </div>
            )}

            <div>
                <table border="1" cellPadding="2" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5">Loading employees...</td>
                            </tr>
                        ) : employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.role}</td>
                                    <td>
                                        <Link to="#">Edit</Link>
                                        <Link to="#">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No employees added in the database</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <nav>
                    <button type="button" 
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled = {pagination.currentPage <= 1 || loading}
                    >
                        Prev
                    </button>
                        {' '}
                    <span>
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                        {' '}
                    <button type="button" 
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled = {pagination.currentPage >= pagination.totalPages || loading}
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default ViewEmployees;