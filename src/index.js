'use strict';

const {app, BrowserWindow } = require('electron');

app.on('before-quit', () => {
    console.log('Saliendo');
});

app.on('ready', () => {
    let win = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        title: 'Hola Mundo',
        center: true,
        maximizable: false
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.loadURL(`file://${__dirname}/renderer/index.html`);

    win.on('move', () => {
        const position = win.getPosition();
        console.log(`La posición es ${position}`);
    });

    win.on('closed', () => {
        win = null;
        app.quit();
    });
});