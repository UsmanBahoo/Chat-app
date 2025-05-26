const {exec}= require('child_process');
const path = require('path');

const startServer = () => {
    const serverDir = __dirname;
    exec(`npm test --prefix ${serverDir}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting server: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Server stderr: ${stderr}`);
            return;
        }
        console.log(`Server started successfully: ${stdout}`);
    });
}

const startClient = () => {
    const clientPath = path.join(__dirname, 'client', 'src', 'index.js');
    exec(`npm run dev --prefix ${path.dirname(clientPath)}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting client: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Client stderr: ${stderr}`);
            return;
        }
        console.log(`Client started successfully: ${stdout}`);
    });
}

const startApp = () => {
  startServer();
  startClient();
}

startApp();