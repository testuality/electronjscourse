const electron = require("electron");

// Existe el objeto document
let button = document.createElement("button");
button.textContent = "Open new window";
button.addEventListener("click", () => {
    // main.openWindow();
    electron.ipcRenderer.invoke('openSecondWindow', "Mensaje para la segunda ventana");
});
document.body.appendChild(button);

// Existe el objeto window
//window.alert("Alerta");