const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
    const {url} = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      // Fetch the content from the provided URL
      const response = await axios.get(url);
      //console.log(response);
      const dom = new JSDOM(response.data);
      //console.log(dom);
      const text = dom.window.document.body.textContent || '';
      //text = text.replace(/\s+/g, ' ').trim();
      //console.log(typeof(text));
  
      // Clean the text and split into words
     // const words = text.toLowerCase().match(/\\b\\w+\\b/g);
     const words = text.toLowerCase().match(/[a-zA-Z\u00C0-\u017F0-9]+/g);
        console.log(words)
      if (!words) {
        return res.status(200).json({ top_words: [] });
      }
  
      // Count the frequency of each word
      const wordCounts = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});
  
      // Get the top 10 most common words
      const topWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
  
      // Return the results as JSON
      res.json({ top_words: topWords });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// app.get('/analyze', async (req, res) => {
//     const url = 'https://www.expertrec.com/';
  
//     if (!url) {
//       return res.status(400).json({ error: 'URL is required' });
//     }
  
//     try {
//       // Fetch the content from the provided URL
//       const response = await axios.get(url);
//       //console.log(response);
//       const dom = new JSDOM(response.data);
//       //console.log(dom);
//       const text = dom.window.document.body.textContent || '';
//       //text = text.replace(/\s+/g, ' ').trim();
//       //console.log(typeof(text));
  
//       // Clean the text and split into words
//      // const words = text.toLowerCase().match(/\\b\\w+\\b/g);
//      const words = text.toLowerCase().match(/[a-zA-Z\u00C0-\u017F0-9]+/g);
//         console.log(words)
//       if (!words) {
//         return res.status(200).json({ top_words: [] });
//       }
  
//       // Count the frequency of each word
//       const wordCounts = words.reduce((acc, word) => {
//         acc[word] = (acc[word] || 0) + 1;
//         return acc;
//       }, {});
  
//       // Get the top 10 most common words
//       const topWords = Object.entries(wordCounts)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 10);
  
//       // Return the results as JSON
//       res.json({ top_words: topWords });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

app.get('/hello',async(req,res)=>{
    res.json({key:'value'})
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});