
const electron = require("electron");
const $ = require("jquery") // (window);

$(() => {
    console.log("document ready");
    $("#root").text("The DOM is now ready and can be manipulated.");
});

