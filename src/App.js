import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ShiftCalendar from './components/ShiftCalendar';
import './App.css';

const App = () => {
  const [error, setError] = useState(null);

  // 仮のシフトデータ
  const shifts = [
    { date: '2024-11-23', timeSlot: 1, description: 'Morning Shift' },
    { date: '2024-11-24', timeSlot: 2, description: 'Evening Shift' },
  ];

  return (
    <Authenticator>
      {({ user, signOut, isLoading }) => (
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="App">
            <header className="App-header">
              <h1>
                {`${user?.attributes?.name || user?.username || 'ゲスト'}さんのカレンダー`}
              </h1>
              <button onClick={signOut} className="signout-button">
                ログアウト
              </button>
            </header>
            <main className="App-main">
              {error ? (
                <div className="error-message">
                  <p>エラーが発生しました: {error}</p>
                </div>
              ) : (
                <ShiftCalendar month={new Date()} shifts={shifts} />
              )}
            </main>
            <footer className="App-footer">
              <p>Powered by AWS Amplify</p>
            </footer>
          </div>
        )
      )}
    </Authenticator>
  );
};

export default App;