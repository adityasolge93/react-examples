// Developer's entry point. Start writing business logic from
// here.
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Practice1 from './pages/Practice1';
import Practice2 from './pages/Practice2';
import Practice3 from './pages/Practice3';
import Practice4 from './pages/Practice4';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [user, setUser] = useState(null);

    const updateUserDetails = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        /** 
         * Practice: Implement conditional rendering based on the presence or absence of user object.
         * If user object is null, redirect user to Login even if the route is /dashboard.
         * If user object is not empty, redirect user to Dashboard even if the route is /login.
         **/
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice-1" element={<Practice1 />} />
            <Route path="/practice-2" element={<Practice2 />} />
            <Route path="/practice-3" element={<Practice3 />} />
            <Route path="/practice-4" element={<Practice4 />} />
            <Route path="/practice-5" element={<Login updateUserDetails={updateUserDetails} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
    );
}

export default App;

