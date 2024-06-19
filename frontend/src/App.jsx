import {useMemo} from 'react'
import {SessionProvider} from "./context/auth.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RouterBuilder from "./routes/route.jsx";

function App() {
  const routes = useMemo(() => RouterBuilder(), []);

  return  <SessionProvider>
    <RouterProvider router={createBrowserRouter(routes)} />
  </SessionProvider>;
}

export default App
