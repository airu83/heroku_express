const express = require('express');
const app = express();
const port = 4000;

app.get('/hello', (req, res) => res.send('Hello Metaso'));

app.listen(port, () => console.log(`Metaso app listen on port ${port}`));
