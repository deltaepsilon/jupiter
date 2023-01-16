const fsPromises = require('fs/promises');
const path = require('path');
const TWO_WEEKS_MILLIS = 1000 * 60 * 60 * 24 * 14;
const FILEPATH = path.join(
  __dirname,
  '../apps/firebase/.emulator-data/database_export/photos-tools-2022-default-rtdb.json'
);

(async () => {
  const mediaItems = await getMediaItems();

  resetMediaItems(mediaItems);

  await fsPromises.writeFile(FILEPATH, JSON.stringify(mediaItems, null, 2));
})();

function resetMediaItems(mediaItems) {
  Object.values(mediaItems['user-owned']).forEach((user) =>
    Object.values(user.library).forEach((library) => {
      const sortedKeys = Object.keys(library['media-items']).sort();
      const today = new Date();
      const keysToDelete = sortedKeys.filter((key) => {
        const keyDateString = key.split('|')[0].slice(5);
        const keyDate = new Date(keyDateString);
        const diff = today.getTime() - keyDate.getTime();

        return diff < TWO_WEEKS_MILLIS;
      });

      keysToDelete.forEach((key) => {
        delete library['media-items'][key];
      });

      library.import.count = 101;
      library.import.status = 'paused';
      library.import.startNextPageToken = null;
      library.import.updated = new Date(Date.now() - TWO_WEEKS_MILLIS).toISOString();

      console.info(`Deleted ${keysToDelete.length} keys`);
    })
  );
}

async function getMediaItems() {
  const mediaItems = await fsPromises.readFile(FILEPATH);

  return JSON.parse(mediaItems);
}
