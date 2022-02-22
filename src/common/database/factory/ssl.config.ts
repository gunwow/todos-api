export interface SequelizeSSLDialectOptions {
  ssl:
    | {
        require: boolean;
        rejectUnauthorized: boolean;
      }
    | boolean;
}

export interface SequelizeSSLConfig {
  ssl: boolean;
  dialectOptions: SequelizeSSLDialectOptions | null;
}

export const getSequelizeSSLConfig = (useSSL: boolean): SequelizeSSLConfig => {
  if (!useSSL) {
    return {
      ssl: false,
      dialectOptions: null,
    };
  }

  return {
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
};
