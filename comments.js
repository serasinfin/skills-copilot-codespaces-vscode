// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Set up web server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Read comments from file
function readComments() {
  try {
    return JSON.parse(fs.readFileSync('./comments.json'));
  } catch (e) {
    return [];
  }
}

// Write comments to file
function writeComments(comments) {
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
}

// Get all comments
app.get('/comments', (req, res) => {
  res.json(readComments());
});

// Add a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    message: req.body.message
    };
    comments.push(newComment);
    writeComments(comments);
    res.json(newComment);
}
);
