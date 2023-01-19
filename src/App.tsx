import "./App.css";
import "antd/dist/reset.css";
import { Layout } from "antd";
import { Nav } from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";
import { CompanyList } from "./components/CompanyList";
import { CompanyForm } from "./components/CompanyForm";
import { UserForm } from "./components/UserForm";
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="layout">
        <Routes>
          <Route path="users" element={<UserList />} />
          <Route path="companies" element={<CompanyList />} />

          <Route path="companies/new-company" element={<CompanyForm />}></Route>
          <Route
            path="companies/update-company/:id"
            element={<CompanyForm />}
          ></Route>

          <Route path="/new-user" element={<UserForm />}></Route>
          <Route path="users/update-user/:id" element={<UserForm />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
