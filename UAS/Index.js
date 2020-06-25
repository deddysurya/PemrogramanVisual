const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;

let homeWindow;
let todayWindow;
let aboutWindow;
let temperatureWindow;

let allAppointment = [];

app.on("ready",  () => {
    homeWindow = new BrowserWindow({
       webPreferences : {
           nodeIntegration : true
        },
        title : "Aplikasi Temperature"  
    });

    homeWindow.loadURL(`file://${__dirname}/home.html`);
    homeWindow.on("closed", () => {
        app.quit();
        homeWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});


const todayWindowCreator = () => {
    todayWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Konversi Suhu"
    });

    todayWindow.setMenu(null);
    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", ()  => (todaytWindow = null));
};

const temperatureWindowCreator = () => {
    temperatureWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Temperature"
    });

    temperatureWindow.setMenu(null);
    temperatureWindow.loadURL(`File://${__dirname}/temperature.html`);
    temperatureWindow.on("closed", ()  => (temperatureWindow = null));
};

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "About"
    });

    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`File://${__dirname}/about.html`);
    aboutWindow.on("closed", ()  => (aboutWindow = null));
};

const menuTemplate = 
[
    {
        label : "Temperature",
        click(){
            temperatureWindowCreator();
        }
    },
    {
        label : "Conversion",
        click(){
            todayWindowCreator();
        }
    },
    {
        label:"About",
        click()
        {
            aboutWindowCreator();
        }
    },
    {
        label: "Quit",
        accelerato : process.platform === "darwin" ? "Command+Q" :
        "Ctrl+Q",
        click(){
        app.quit(); 
        }
    },
];