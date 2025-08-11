// import "./App.css";
import Login from "./pages/login/Login";
import Console from "./pages/dashboard/console";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateMainPage from "./pages/dashboard/usertemplates/userTemplate";
import NewTemplate from "./pages/dashboard/new-template/NewTemplate";
import Settings from "./pages/dashboard/settings-page/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Console />}>
            <Route path="reports" element={<Dashboard />} />
            <Route path="new-template" element={<NewTemplate />} />
            <Route path="my-template" element={<TemplateMainPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
