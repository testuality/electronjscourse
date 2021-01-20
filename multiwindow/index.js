const electron = require("electron");
const $ = require("jquery");

// Existe el objeto document
let button = document.createElement("button");
button.textContent = "Open new window";
button.addEventListener("click", () => {
    // main.openWindow();
    electron.ipcRenderer.invoke('openSecondWindow', "Mensaje para la segunda ventana");
});
document.body.appendChild(button);

$("#toggleAboutMenuBtn").on("click", () => {
    electron.ipcRenderer.invoke("toggleAboutMenuItem", "Mensaje");
});
// Existe el objeto window
//window.alert("Alerta");