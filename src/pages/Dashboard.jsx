import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Dashboard() {
    const user = useContext(AuthContext);

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>This is where wonders happen</p>
        </div>
    );
}

export default Dashboard;