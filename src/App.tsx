import "./App.css";
import "antd/dist/reset.css";
import { Layout } from "antd";
import { Nav } from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "./components/user/UserList";
import { CompanyList } from "./components/company/CompanyList";
import { CompanyForm } from "./components/company/CompanyForm";
import { UserForm } from "./components/user/UserForm";
import { Newsletter } from "./components/newsletter/Newsletter";
import { PostComment } from "./components/newsletter/PostComment";
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="layout">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="companies/new-company" element={<CompanyForm />}></Route>
          <Route
            path="companies/update-company/:id"
            element={<CompanyForm />}
          ></Route>

          <Route path="/new-user" element={<UserForm />}></Route>
          <Route path="users/update-user/:id" element={<UserForm />}></Route>
          <Route path="/posts/:id/comment" element={<PostComment />}></Route>
          <Route path="/create-user/:companyId" element={<UserForm />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
