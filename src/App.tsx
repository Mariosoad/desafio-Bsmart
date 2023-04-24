
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import './App.css'

function App() {  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} > Home </Route>
        <Route path="/:userId" element={<Profile />} > Home </Route>
      </Routes>
    </>
  )
}

export default App
