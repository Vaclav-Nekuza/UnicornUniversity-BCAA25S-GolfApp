import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Dashboard from "./course/dashboard";
import GameList from "./game/game-list";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/CourseList" element={<CourseList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
