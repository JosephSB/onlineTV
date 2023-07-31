import { Navigate, useRoutes } from "react-router-dom";
import App from "../App";
import Live from "../pages/Live";

function AppRouter() {
    const routes = [
        {
            path: "/",
            element: <App/>,
        },
        {
            path: "/live/:id",
            element: <Live/>,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ];

    return useRoutes(routes);
}

export default AppRouter;