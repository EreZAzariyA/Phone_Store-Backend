abstract class Config {
      public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
      public constructor() {
            super();
            this.loginExpiresIn = "3h"
      }
}

class ProductionConfig extends Config {
      public constructor() {
            super();
            this.loginExpiresIn = "30m"
      }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
