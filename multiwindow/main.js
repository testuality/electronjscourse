const electron = require("electron");
const {app, BrowserWindow, BrowserView, ipcMain} = electron;

const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow(
        {
            width: 800,
            height: 600,
            show: false,
            backgroundColor: '#AAAAAA',
            webPreferences: {
                nodeIntegration: true
              }
        }
    );
    win.loadFile("index.html"); 

    // Open development tools window
    win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
      })
}

exports.openWindow = () => {
    let newWin = new BrowserWindow(
        {
            width: 400,
            height: 200,
            parent: win,
            modal: true,
            show: false,
            backgroundColor: '#FFFFFF',
            webPreferences: {
                nodeIntegration: true
              }
        }
    );
    newWin.setMenu(null);
    newWin.loadFile("subwindow.html"); 
    // Open development tools window
    newWin.webContents.openDevTools();
    newWin.once('ready-to-show', () => {
        newWin.show();
    });

    /*
    const view = new BrowserView()
    newWin.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')
    */
}

app.on("ready", createWindow);


ipcMain.handle('openSecondWindow', (event, msg) => {
    console.log(msg);
    this.openWindow();
});