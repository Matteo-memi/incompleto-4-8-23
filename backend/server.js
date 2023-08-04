const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const jsonServer = require('json-server');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Simulate a database with in-memory data
const db = {
  tweets: []
};

// Add a new tweet
app.post('/api/tweets', (req, res) => {
  const { text } = req.body;
  const newTweet = {
    id: shortid.generate(),
    text,
    date: new Date().toISOString()
  };
  db.tweets.unshift(newTweet);
  res.json(newTweet);
});

// Update a tweet
app.put('/api/tweets/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = db.tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// JSON Server (for simulating database)
const jsonServerRouter = jsonServer.router({ tweets: db.tweets });
app.use('/api', jsonServerRouter);

// JSON Server Middleware
app.use(jsonServer.defaults());
