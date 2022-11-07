export function retry<T>(
  callback: () => T,
  { attempts = 3, millis = 300, failSilently = false }: { attempts?: number; failSilently?: boolean; millis?: number }
): () => Promise<T> {
  let attempt = 0;
  let error: unknown;

  return () =>
    new Promise((resolve, reject) => {
      function tryAgain() {
        attempt++;

        if (attempt > attempts) {
          !failSilently && reject(error);
        } else {
          setTimeout(async () => {
            try {
              const result = await callback();

              resolve(result);
            } catch (e) {
              error = e;
              tryAgain();
            }
          }, millis);
        }
      }

      attempt = 0;
      tryAgain();
    });
}
