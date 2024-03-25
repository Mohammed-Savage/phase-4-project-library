import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookPage from "./pages/BookPage.jsx";
import MemberPage from "./pages/MemberPage.jsx";

const routes = [

    // Home page
    {
        path: "/",
        element: <HomePage></HomePage>
    },

    // Books page
    {
        path: "/books",
        element: <BookPage></BookPage> // 
    },

    // Members page
    {
        path: "/members",
        element: <MemberPage></MemberPage> // 
    },

    //appear whenever the url is different from the constructed routes
    {
        path: "*",
        element: <ErrorPage></ErrorPage> // 
    },
];

export default routes;