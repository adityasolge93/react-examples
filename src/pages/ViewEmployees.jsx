import { Link } from 'react-router-dom';
import useEmployees from '../hooks/useEmployees';

function ViewEmployees() {
    const { employees, loading, errors, pagination, handlePageChange } = useEmployees();

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