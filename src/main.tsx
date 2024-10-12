import "./styles/index.css"
import App from "./App.tsx"
import { StrictMode } from "react"
import { theme } from "../theme.tsx"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
