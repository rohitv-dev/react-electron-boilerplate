const {app, BrowserWindow, screen} = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    var {width, height} = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});