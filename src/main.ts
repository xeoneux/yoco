const electron = require("electron");
const Positioner = require("electron-positioner");

const {app, Menu, Tray} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = electron;

let parentWindow;
let mainWindow;

const mainWindowTransform = {
    width: 640,
    height: 480,
    posX: 0,
    posY: 0,
    offsetX: -65,
    offsetY: -20
}

function createWindow() {

    parentWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        transparent: true,
        show: false,
        skipTaskbar: true,
        useContentSize: true
    });

    parentWindow.setIgnoreMouseEvents(true);

    let mainWindowOptions = {
        parent: parentWindow,
        modal: true,
        show: true,
        frame: false,
        resizable: false,
        transparent: true,
        width: mainWindowTransform.width,
        height: mainWindowTransform.height,
        alwaysOnTop: false,
        movable: true,
        skipTaskbar: false,
        background: "#00000033"
    };
    mainWindow = new BrowserWindow(mainWindowOptions);

    const positioner = new Positioner(mainWindow);
    positioner.move("bottomRight");

    let pos = mainWindow.getPosition();
    mainWindowTransform.posX = pos[0];
    mainWindowTransform.posY = pos[1];

    mainWindow.loadURL(`file://${__dirname}/../src/client/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);


app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
