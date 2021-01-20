const electron = require("electron");
const { MenuItem } = require("electron/main");
const { app, BrowserWindow, BrowserView, ipcMain, Menu} = electron;

const path = require("path");
const url = require("url");

let win;
let aboutMenuItem;

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
    //win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
    });

    let menu = getMainMenu();
      Menu.setApplicationMenu(null);
      console.log("Menu", menu);
      win.setMenu(menu);
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
    // newWin.setMenu(null);
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

function getMainMenu() {
    /*
    let menu = new Menu();
    let fileMenu = new MenuItem({label: "File"});
    menu.append(fileMenu);

    menu.append(debugMenu)
*/
    let toggleMenuItem = new MenuItem({
        label: "Toggle dev tools",
        click() {
            if (win.webContents.isDevToolsOpened()){
                win.webContents.closeDevTools();
            }
            else {
                win.webContents.openDevTools();
            }
        }
    });
    aboutMenuItem = new MenuItem({label: "About..."});
    
    let menu = Menu.buildFromTemplate([
        {
            label: 'File',
                submenu: [
                {label:'Adjust Notification Value'},
                {label:'CoinMarketCap'},
                {type: "separator"},
                {
                    label:'Exit', 
                    click() { 
                        app.quit() 
                    } 
                }
            ]
        },
        {
            label: "Debug",
                submenu: [toggleMenuItem
                    /*
                    {
                        label: "Toggle dev tools",
                        click() {
                            if (win.webContents.isDevToolsOpened()){
                                win.webContents.closeDevTools();
                            }
                            else {
                                win.webContents.openDevTools();
                            }
                        }
                    }*/
                ]
        },
        {
            label: "Help",
            submenu: [
                aboutMenuItem
            ]
        }
      ]);
      return menu;
}

// app.on("ready", createWindow);
app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.handle('openSecondWindow', (event, msg) => {
    console.log(msg);
    this.openWindow();
});

ipcMain.handle("toggleAboutMenuItem", (event, data) => {
    aboutMenuItem.enabled = !aboutMenuItem.enabled;
});