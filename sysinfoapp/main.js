const {app, BrowserWindow} = require("electron");

// Global reference to the main window object
let win;

console.log(process.platform);
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: "./img/medical-app.png"
    });
    win.loadFile("./index.html");

    // Open the develoment tools
    win.webContents.openDevTools();
    
    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        // For platforms different from MacOS
        app.quit();
    }
});
