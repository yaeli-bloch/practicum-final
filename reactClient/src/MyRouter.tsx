import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyGroups from "./components/MyGroups"; // הדף שמציג את הקבוצות
import GroupPage from "./components/GroupPage"; // הדף של הקבוצה
 import HomePage from "./components/HomePage";
import Layout from "./Layout";
import PrivateRoute from "./components/PrivateRoute";
import CalendarPage from "./components/CalendarPage";
import AddUser from "./components/AddUser";
import RemoveUser from "./components/RemoveUser";
import MembersOfGroup from "./components/members";
import UserProfileUpdate from "./components/UpDate";
export const Myrouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },  
        {
            path: "/Mygroups",
            element: (
              <PrivateRoute>
                <MyGroups />
              </PrivateRoute>
            ),
          },
        // {path:"/MyGroup",element:<GroupPage/>},
        // {path:"/calendar",element:<CalendarPage/>}  ,
        // {path:"/add-member", element:<AddUser />},
        // {path:"/remove-member", element: <RemoveUser/>} 
        // , {path:"/group-users",element:<MembersOfGroup />},
        {
          path: "/MyGroup",
          element: <GroupPage />,
          children: [
            { path: "calendar", element: <CalendarPage /> },
            { path: "add-member", element: <AddUser /> },
            { path: "remove-member", element: <RemoveUser /> },
            { path: "group-users", element: <MembersOfGroup /> },
      ],
    },
  ]}
  ]);

export default function App() {
  return <RouterProvider router={Myrouter} />;
}
