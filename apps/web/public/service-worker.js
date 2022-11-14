self.addEventListener('install', function (event) {
  console.log('Service worker installing...', event);
});

self.addEventListener('message', function (event) {
  const data = event.data;

  switch (data.type) {
    case 'syncJob':
      return handleSyncJob(data);
  }
});

// TODO: Create TS build for service worker and connect to RTDB
// TODO: Create app logo

function handleSyncJob(data) {
  switch (data.action) {
    case 'start':
      console.log('start sync job', data);
      return;
  }
}
