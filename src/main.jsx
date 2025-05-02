import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import Layout from "./Layout.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ShopContextProvider>
      <Layout>
        <App />
      </Layout>
    </ShopContextProvider>
  </BrowserRouter>
);
