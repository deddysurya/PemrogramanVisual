import React from "react"
import logo from "./logo.svg"
import "./App.css"
import SideBar from "./Component/Sidebar"
import CreateAppoinment from "./Component/appointments/Create"
import ListAppoinment from "./Component/appointments/List"
import TodayAppoinment from "./Component/appointments/Today"

function App() {
  return (
    <div>
      <SideBar />
        <CreateAppoinment />
        <ListAppoinment />
        <TodayAppoinment />
    </div>
  );
}

export default App;
