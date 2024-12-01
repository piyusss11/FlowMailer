import SequenceCanvas from "./components/SequenceCanvas";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useGetUser from "./hooks/useGetUser";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  const user = useGetUser();
  console.log(user);

  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route
            path="/"
            element={
              user?.email ? (
                <SequenceCanvas />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={user?.email ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={
              user?.email ? <Navigate to="/" replace /> : <RegisterPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
