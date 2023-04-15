const { fork } = require('child_process');
const fsPromises = require('fs/promises');
const path = require('path');
const DAEMON_PATH = path.join(__dirname, 'daemon.js');
const CWD = process.env._ ? path.dirname(process.env._) : process.cwd();
const LOG_PATH = path.join(CWD, 'logs.txt');

const MAX_TRIES = 10;
const HOSTS = ['localhost', '127.0.0.1'];
let tries = 0;

function launch() {
  const forked = fork(DAEMON_PATH, [`--host=${HOSTS[tries % 2]}`], { cwd: process.cwd() });

  forked.on('message', async (message) => {
    if (message.error) {
      console.error(message.error);

      if (tries < MAX_TRIES) {
        console.info(`🤖 Restarting daemon after a crash. Try #${++tries}`);

        launch();
      } else {
        await fsPromises.appendFile(LOG_PATH, JSON.stringify(message.error), 'utf-8');
        console.info(`🤖 Stopping daemon after ${tries} tries. See logs: ${LOG_PATH}`);
      }
    }
  });
}

process.stdin.resume(); // Don't close the terminal at exit. Keep alive!!!
launch();
