import {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useSession} from "../context/auth.jsx";
import Loading from "../components/Loading.jsx";

function ProtectedRoute({children}) {
    const { user } = useSession();
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        // Simulating session check delay with setTimeout
        const delay = setTimeout(() => {
            setIsCheckingSession(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    if (isCheckingSession) {
        // Render loading indicator while checking session
        return <Loading/>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
}

export default ProtectedRoute;
