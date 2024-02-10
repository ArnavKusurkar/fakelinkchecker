const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validUrl = require('valid-url');
const dns = require('dns'); 
const fakeLinkDetector = require('./fakeLinkDetector');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/check-link', async (req, res) => {
  const { link } = req.body;

  if (!await isValidURL(link)) {
    return res.status(400).json({ error: 'Invalid link provided' });
  }

 
  const result = fakeLinkDetector(link);
  res.json({ result });
});

async function isValidURL(url) {

  if (!validUrl.isUri(url)) {
    return false;
  }

  const hostname = new URL(url).hostname;


  try {
    await dns.promises.lookup(hostname);
    return true; 
  } catch (error) {
    return false; 
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
