import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Dictate from "./pages/Dictate";
import User, { userLoader } from "./pages/User";
import Progress from "./pages/Progress";
import Soap from "./pages/Soap";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/user" element={<User />} loader={userLoader} />
          <Route index element={<Dictate />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/soap" element={<Soap />} />
          <Route path="/login" element={<Login />} />;
        </Route>
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
