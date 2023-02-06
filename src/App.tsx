import "./App.css";
import "./assets/styles/App.scss";
import "antd/dist/reset.css";
import { Nav } from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import { UserList } from "./components/user/UserList";
import { CompanyList } from "./components/company/CompanyList";
import { CompanyForm } from "./components/company/CompanyForm";
import { PostComment } from "./components/newsletter/PostComment";
import { Posts } from "./components/newsletter/Posts";
function App() {
  return (
    <div className="App">
      <Nav />
      <div className="outer_layout">
        <div className="layout">
          <Routes>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/users" element={<UserList />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/newsletter" element={<Posts />} />
            <Route
              path="companies/new-company"
              element={<CompanyForm />}
            ></Route>
            <Route
              path="companies/update-company/:id"
              element={<CompanyForm />}
            ></Route>

            {/* <Route path="/new-user" element={<UserForm />}></Route> */}
            {/* <Route path="users/update-user/:id" element={<UserForm />}></Route> */}
            <Route path="/posts/:id/comment" element={<PostComment />}></Route>
            {/* <Route path="/create-user/:companyId" element={<UserForm />}></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
