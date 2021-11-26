const express = require('express');
const app = express();
const port = process.env.PORT? process.env.PORT: 5000;

app.get('/hello', (req, res) => res.send('Hello Metaso'));

app.listen(port, () => console.log(`Metaso app listen on port ${port}`));
