import HomePage from "../src/pages/HomePage";
import Layout from "./components/ui/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page404 from "./components/ui/404";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
