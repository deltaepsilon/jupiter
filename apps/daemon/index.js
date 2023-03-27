const { fork } = require('child_process');
const path = require('path');
const DAEMON_PATH = path.join(__dirname, 'daemon.js');

function launch() {
  const forked = fork(DAEMON_PATH);

  console.info('🤖 Launching daemon...');

  forked.on('uncaughtError', (code) => {
    if (code === 0) {
      setTimeout(() => {
        console.info('🤖 Restarting daemon after a crash...');

        launch();
      }, 2000);
    }
  });
}

launch();
