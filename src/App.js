import './App.css';

function App() {
  return (
    <div className="App">
      <div className="pride-bar"></div>

      <header className="hero">
        <h1 className="title">Celebrate Love. Celebrate Pride. 🏳️‍🌈</h1>
        <p className="subtitle">Visibility. Unity. Joy. Always.</p>
      </header>

      <div className="image-wrapper">
        <img src="/guys.jpg" alt="Pride" className="main-image" />
        <div className="flag-overlay">🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️ 🟪</div>
      </div>

      <div className="flags-strip">
        <span>🏳️‍🌈</span>
        <span>🏳️‍⚧️</span>
        <span>⚧</span>
        <span>🌈</span>
        <span>🟩</span>
        <span>🟨</span>
        <span>🟧</span>
        <span>🟥</span>
      </div>

      <footer className="footer">
        <p>Made with pride. For everyone. Always. 🫶</p>
      </footer>
    </div>
  );
}

export default App;
