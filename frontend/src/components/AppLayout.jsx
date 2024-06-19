import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from "../components/Navbar.jsx";
import Loading from "../components/Loading.jsx";

const AppLayout = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TopNavbar />
            <Outlet />
        </Suspense>
    );
};

export default React.memo(AppLayout);
