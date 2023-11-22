import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/index.scss";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main>
        <App />
      </main>
    </QueryClientProvider>
  </React.StrictMode>
);
