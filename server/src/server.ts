import app from './app';
import config from './config/config';

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, config.host, () => {
    console.log(`Started server at ${config.host}:${config.port}`);
  });
}
