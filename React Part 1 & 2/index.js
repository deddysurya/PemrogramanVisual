const electron = require("electron")
const fs = require("fs")
const uuid = require("uuid")

const { app, BrowserWindow, ipcMain, Menu } = electron

let mainWindow

let allAppointment = []

fs.readFile("aye.json", (err, jsonAppointments) => {
    if(!err) {
        const oldAppoinments = JSON.parse(jsonAppointments)
        allAppointments = oldAppoinments
    }
})

const createWindow = () => {
    mainWindow = new BrowserWindow ({
        webPreference :
        {
            noteIntegration : true,
        },
        title: "Doctor Appointments",
        
    })
    const startUrl = process.env.ELECTRON_START_URL || `file://${_dirname}/build/index.html`

    mainWindow.loadURL(startUrl)

    mainWindow.on("closed", () => {
        const jsonAppointments = JSON.stringify(allAppointment)
        fs.writeFileSync("aye.json", jsonAppointments)

        app.quit()
        mainWindow = null
    })

    if (process.env.ELECTRON_START_URL) {
        const mainMenu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(mainMenu)
    } else {
        Menu.setApplicationMenu(null)
    }

}

app.on("ready", createWindow)

ipcMain.on("appointment:create", (event, appointment) => {
    appointment["id"] = uuid()
    appointment["done"] = 0

    allAppointments.push(appointment)
})

ipcMain.on("appointment:request:list", (event) => {
    mainWindow.webContents.send("appointment:response:list", allAppointments)
})

ipcMain.on("appointment:request:today", (event) => {
    sendTodayAppointments()
})

ipcMain.on("appointment:done", (event, id) => {
    allAppointments.forEach(appointment => {
        if (appointment.id === id) appointment.done = 1
    })

    sendTodayAppointments()
})

const sendTodayAppointments = () => {
    const today = new Date().toISOString().slice(0 , 10)
    const filtered = allAppointments.filter(
        (appointments) => appointments.Date === today
    )

    mainWindow.webContents.send("appoinments:response:today", filtered)
}

const menuTemplate = [
    {
        label:"View",
        submenu: [{ role: "reload" }, {role: "toggledevtools"}],
    },
]