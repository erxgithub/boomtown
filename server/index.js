import express from 'express';
import cors from 'cors';
import fallback from 'express-history-api-fallback';

import initConfigs from './config';
import initAPI from './api';

const app = express();
const PORT = process.env.PORT || 5000;

initConfigs(app);

if (process.env.NODE_ENV === 'production') {
  const root = `${__dirname}/public`;
  app.use(express.static(root));
  app.use(fallback('index.html', { root }));
} else {
  app.use('*', cors());
}

initAPI(app);

app.listen(PORT, () => console.log(
  `Server is now running on http://localhost:${PORT}`,
));
