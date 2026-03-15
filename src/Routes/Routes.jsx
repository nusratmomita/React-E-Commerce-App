import { createBrowserRouter } from "react-router";
import ProductsPage from "../Pages/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: ProductsPage,
        children: [
            {
                index: true,
                path: "/",
                Component: ProductsPage
            }
        ]
    }
])