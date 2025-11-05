import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlackjackGame from "./games/BlackJack";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/blackjack" replace />} />
        <Route path="/blackjack" element={<BlackjackGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
