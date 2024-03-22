import Home from "./pages/Home.jsx"
import ErrorPage from "./pages/Error.jsx";
import Books from "./pages/Books.jsx";
import Members from "./pages/Members.jsx";

const routes = [

    // Home page
    {
        path: "/",
        element: <Home></Home>
    },

    // Books page
    {
        path: "/books",
        element: <Books></Books> // 
    },

    // Members page
    {
        path: "/members",
        element: <Members></Members> // 
    },

    //appear whenever the url is different from the constructed routes
    {
        path: "*",
        element: <ErrorPage></ErrorPage> // 
    },
];

export default routes;