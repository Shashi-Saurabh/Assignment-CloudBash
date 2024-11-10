import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    try {
      const response = await axios.post('http://localhost:5000/analyze', { url });
      setResults(response.data.top_words);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>Word Frequency Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br/>
        <br/>
        <button type="submit">Analyze</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {results.map(([word, count], index) => (
              <tr key={index}>
                <td>{word}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App