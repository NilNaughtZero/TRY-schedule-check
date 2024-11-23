// src/App.js
import React, { useState } from 'react';
import ShiftCalendar from './components/ShiftCalendar';
import './App.css';

function App() {
  // テスト用のダミーデータ（より現実的な例）
  const [shifts] = useState([
    { date: '10/07', timeSlot: 5, description: 'テストシフト1' },
    { date: '10/08', timeSlot: 2, description: 'テストシフト2' },
    { date: '10/10', timeSlot: 3, description: 'テストシフト3' }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>シフトカレンダー</h1>
      </header>
      <main className="App-main">
        <ShiftCalendar 
          shifts={shifts} 
          month={new Date()} 
        />
      </main>
    </div>
  );
}

export default App;