import "./App.css";
import { MainPage } from "./pages/MainPage";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Profile } from "./pages/profile/Profile";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App