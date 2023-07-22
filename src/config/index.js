const config = require('./config');

class ConfigHandler {
  constructor() {
    this.values = {};
  }

  set(key, value) {
    this.values[key] = value;
  }

  get(key) {
    return this.values[key];
  }

  loadConfigValues(values) {
    Object.keys(values).forEach((key) => this.set(key, values[key]));
  }

  async loadEnvironmentConfig(environmentConfig) {
    this.loadConfigValues(environmentConfig);
  }

  async load() {
    try {
      await this.loadEnvironmentConfig(config.default);
      const environment = process.env.NODE_ENV;
      this.set('env', environment);

      console.info(`[CONFIG] Loading config for ${environment} environment...`);

      switch (environment) {
        case 'development':
          await this.loadEnvironmentConfig(config.development);
          break;

        case 'testing':
          await this.loadEnvironmentConfig(config.staging);
          break;

        case 'staging':
          await this.loadEnvironmentConfig(config.staging);
          break;

        case 'beta':
          await this.loadEnvironmentConfig(config.beta);
          break;

        case 'production':
          await this.loadEnvironmentConfig(config.production);
          break;

        default:
          throw new Error('No config for environment');
      }

      console.info(`[CONFIG] Successfully loaded config.`);
    } catch (err) {
      console.error('[CONFIG] Error loading config', err);
    }
  }
}

const configuration = new ConfigHandler();

module.exports = configuration;
