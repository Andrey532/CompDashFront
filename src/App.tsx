import "./App.css";
import { MainPage } from "./pages/MainPage";
import { SignIn } from "./pages/auth/SignIn";
import { Register } from "./pages/auth/SignUp";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App