import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <h1>Calculator Field. Practical test task (Kochurovskyi Yurii) 🙃</h1>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
