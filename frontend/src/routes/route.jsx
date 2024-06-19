import Login from "../pages/login.jsx";
import { Navigate} from "react-router-dom";
import Register from "../pages/register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "../pages/dashboard.jsx";
import AppLayout from "../components/AppLayout.jsx";

const RouterBuilder = () => {
    const generalRoutes = [
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ];

    const customerRoutes = [
        {
            path: "/dashboard",
            element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        },
    ];
    const routes = [
        {
            element: <AppLayout/>,
            children: [
                ...generalRoutes,
                ...customerRoutes
            ]
        },
    ];

    return routes;
};

export default RouterBuilder;
