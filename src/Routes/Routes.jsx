import { createBrowserRouter } from "react-router";
import ProductsPage from "../Pages/ProductsPage";
import Root from "../Root/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                loader: () => fetch("/productsData.json"),
                Component: ProductsPage
            }
        ]
    }
])