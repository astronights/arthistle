import app from './app';
import config from './config/config';

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`Started server at ${config.host}:${config.port}`);
  });
}
