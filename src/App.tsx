import "./App.css";
import "antd/dist/reset.css";
import { Layout } from "antd";
import { Nav } from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";
import { CompanyList } from "./components/CompanyList";
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="layout">
        <Routes>
          <Route path="users" element={<UserList />} />

          <Route path="companies" element={<CompanyList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
