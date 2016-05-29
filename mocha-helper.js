const Describe = describe || () => {
  };
const It = it || () => {
  };

export default async function MochaHelper(config, description = '') {
  if (config instanceof Object) {
    Describe(description, () => {
      for (const k in config) {
        const value = config[k];

        if (value instanceof Function) {
          It(k, async done => {
            let testError;

            try {
              await value();
            } catch (error) {
              testError = error;
            }

            if (done instanceof Function) {
              done(testError);
            }
          });
        } else if (value instanceof Object) {
          try {
            MochaHelper(value, k);
          } catch (error) {
            suiteError = error;
          }
        }
      }
    });
  }
}
