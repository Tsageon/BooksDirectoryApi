const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

const dataDir = path.join(__dirname, 'Books');  
const filePath = path.join(dataDir, 'bookstore.json');

let lastId = 0;

const getLastIdFromData = (data) => {
  return data.length === 0 ? 0 : Math.max(...data.map(item => item.id));
};

const initJSONFile = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    lastId = 0; 
  } else {
    const data = readJSONFile();
    lastId = getLastIdFromData(data);
  }
};

const readJSONFile = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeJSONFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

initJSONFile();

app.use(express.json());

app.get('/bookstore', (req, res) => {
  const isbn = req.query.isbn ? Number(req.query.isbn) : null;
  const data = readJSONFile();

  if (isbn) {
    const book = data.find(item => item.isbn === isbn);
    if (!book) {
      return res.status(404).send('Book not found.');
    }
    return res.json(book);
  }
  res.json(data);
});

app.post('/bookstore', (req, res) => {
  const newItem = req.body;

  newItem.isbn = Number(newItem.isbn);

  if (!newItem.title || !newItem.author || !newItem.publisher || !newItem.publishedDate || !newItem.isbn || isNaN(newItem.isbn)) {
    return res.status(400).send('Book must have a valid title, author, publisher, publishedDate, and ISBN.');
  }

  const data = readJSONFile();

  if (data.find(book => book.isbn === newItem.isbn)) {
    return res.status(409).send('A book with this ISBN already exists.');
  }

  lastId += 1;
  newItem.id = lastId;
  data.push(newItem);
  writeJSONFile(data);

  res.status(201).json(newItem);
});

app.put('/bookstore', (req, res) => {
  const updatedItem = req.body;

  updatedItem.isbn = Number(updatedItem.isbn);

  if (!updatedItem.title || !updatedItem.author || !updatedItem.publisher || !updatedItem.publishedDate || !updatedItem.isbn || isNaN(updatedItem.isbn)) {
    return res.status(400).send('Book must have a valid title, author, publisher, publishedDate, and ISBN.');
  }

  const data = readJSONFile();
  const index = data.findIndex(item => item.isbn === updatedItem.isbn);

  if (index === -1) {
    return res.status(404).send('Book not found.');
  }

  data[index] = { ...data[index], ...updatedItem };
  writeJSONFile(data);

  res.json(data[index]);
});

app.delete('/bookstore', (req, res) => {
  const isbn = req.query.isbn ? Number(req.query.isbn) : null;

  if (!isbn || isNaN(isbn)) {
    return res.status(400).send('ISBN is required and must be a valid number.');
  }

  const data = readJSONFile();
  const index = data.findIndex(item => item.isbn === isbn);

  if (index === -1) {
    return res.status(404).send('Book not found.');
  }

  data.splice(index, 1);
  writeJSONFile(data);

  res.send('Book deleted successfully.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/bookstore`);
});
