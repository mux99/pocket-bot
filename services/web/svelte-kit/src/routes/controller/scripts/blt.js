import { updateBattery, updateLives, updateFall } from './update.js'

/*
notes:
- the page always sends a signal when connected
- the curent delay between transmissions is 100ms
- the signal sent is a string of two numbers going from -10 to 10, separated by a dollar sign ($)
- the accelerometer is on by default (impact on the sliders for visuals)
- the value of the acelerometer is only send if one of the thum buttons (grey and translusent) is pressed
- the accelerometer is disabled suspended if the manual mode is started
- !!! the manual mode has no safety on the phone side!!! drop it at your own risks

- modifications where made to the base code (I can't remembre witch ones ^^)
*/
let myInterval;
let characteristicCache = null;
let deviceCache = null;
let readBuffer = '';
let rightSpeed = "0"; 
let leftSpeed = "0";
let old_rightSpeed = "0";
let old_leftSpeed = "0";
let old_armActivate = "0";
let armActivate = "0";
let operatingSystem = "";
let compt = 1;

export function get_os() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        operatingSystem = "iOS"
        }
        else if (window.DeviceMotionEvent !== undefined) {
            operatingSystem = "Android"
        }
        else {
            operatingSystem = "other"
        }
}

export function updateSpeed(left_speed, right_speed) {
    leftSpeed = left_speed;
    rightSpeed = right_speed;
}

export function updateArm(arm_bool) {
    armActivate = arm_bool;
}

// Bluetooth actions ---------------------------------------------------------------------------------
export function connect() {
    return (deviceCache ? Promise.resolve(deviceCache) :
        requestBluetoothDevice()).
    then(device => connectDeviceAndCacheCharacteristic(device)).
    then(characteristic => startNotifications(characteristic)).
    then(myInterval = setInterval(sendingBLEinfo, 100)).
    catch(error => handleError(error));
}
export function disconnect() {
    clearInterval(myInterval); //stop sending data every time
    if (deviceCache) {
        console.log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
        deviceCache.removeEventListener('gattserverdisconnected',
            handleDisconnection);

        if (deviceCache.gatt.connected) {
            deviceCache.gatt.disconnect();
            console.log('"' + deviceCache.name + '" bluetooth device disconnected');
        }
        else {
            console.log('"' + deviceCache.name +
                '" bluetooth device is already disconnected');
        }
    }

    // Added condition
    if (characteristicCache) {
        characteristicCache.removeEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
        characteristicCache = null;
    }

    deviceCache = null;
}

function sendingBLEinfo() {
    let out = "";
    compt -= 1;
    if (compt <= 0) {
        out += "BAT0LIV0FLP0";
        compt = 15;
    }
    if (leftSpeed != old_leftSpeed) {
        out += "LFT" + leftSpeed;
    }
    if (rightSpeed != old_rightSpeed) {
        out += "RGT" + rightSpeed;
    }
    if (armActivate != old_armActivate) {
        out += "ARM" + armActivate;
    }
    old_armActivate = armActivate;
    old_leftSpeed = leftSpeed;
    old_rightSpeed = rightSpeed;
    send(out, true);
}

function receive(data) {
    console.log(data);
    const charac = /(BAT|LIV|FLP)(\d+)/g;
    let result;
    const sameCmd = {};

    while ((result = charac.exec(data)) !== null) {
        const cmdCode = result[1];
        const cmdValue = parseInt(result[2], 10);

        if (sameCmd[cmdCode]) {
            throw new Error(`The command '${cmdCode}' is duplicate`);
        } else {
            sameCmd[cmdCode] = true;
        }

        // update values
        if (cmdCode === 'BAT') {
            updateBattery(cmdValue);
        } else if (cmdCode === 'LIV') {
            updateLives(cmdValue);
        } else if (cmdCode === 'FLP') {
            updateFall(cmdValue);
        }
        else {
            continue;
        }
    }
}

function handleError(error) {
    let bluetooth_button = document.getElementById("bluetooth_button");
    console.log(error);
    bluetooth_button.classList.remove("connected");
    bluetooth_button.classList.remove("connecting");
    bluetooth_button.classList.add("disconnected");
}

// General Bluetooth ----------------------------------------------------------------------------------
function startNotifications(characteristic) {
    console.log('Starting notifications...');

    return characteristic.startNotifications().
    then(() => {
        console.log('Notifications started');
        // Added line
        characteristic.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);
    });
}
function requestBluetoothDevice() {
    console.log('Requesting bluetooth device...');

    return navigator.bluetooth.requestDevice({
        filters: [{
             services: [0xFFE0]
        }],
    }).
    then(device => {
        console.log('"' + device.name + '" bluetooth device selected');
        deviceCache = device;

        // Added line
        deviceCache.addEventListener('gattserverdisconnected',
            handleDisconnection);

        return deviceCache;
    });
}
function connectDeviceAndCacheCharacteristic(device) {
    if (device.gatt.connected && characteristicCache) {
        return Promise.resolve(characteristicCache);
    }

    console.log('Connecting to GATT server...');

    return device.gatt.connect().
    then(server => {
        console.log('GATT server connected, getting service...');

        return server.getPrimaryService(0xFFE0);
    }).
    then(service => {
        console.log('Service found, getting characteristic...');

        return service.getCharacteristic(0xFFE1);
    }).
    then(characteristic => {
        console.log('Characteristic found');
        characteristicCache = characteristic;
        let bluetooth_button = document.getElementById("bluetooth_button");
        bluetooth_button.classList.remove("connecting");
        bluetooth_button.classList.add("connected");
        return characteristicCache;
    });
}
function handleDisconnection(event) {
    let device = event.target;
    let bluetooth_button = document.getElementById("bluetooth_button");
    bluetooth_button.classList.remove("connected");
    bluetooth_button.classList.remove("connecting");
    bluetooth_button.classList.add("disconnected");

    console.log('"' + device.name +
        '" bluetooth device disconnected, trying to reconnect...');

    connectDeviceAndCacheCharacteristic(device).
    then(characteristic => startNotifications(characteristic)).
    catch(error => console.log(error));
}
function send(data, logging = true) {
    data = String(data);

    if (!data || !characteristicCache) {
        return;
    }

    data += '\n';

    if (data.length > 20) {
        let chunks = data.match(/(.|[\r\n]){1,20}/g);

        writeToCharacteristic(characteristicCache, chunks[0]);

        for (let i = 1; i < chunks.length; i++) {
            setTimeout(() => {
                writeToCharacteristic(characteristicCache, chunks[i]);
            }, i * 500);
        }
    }
    else {
        writeToCharacteristic(characteristicCache, data);
    }

    if (logging) {
        console.log(data, 'out');
    }
}
function writeToCharacteristic(characteristic, data) {
    characteristic.writeValue(new TextEncoder().encode(data));
}
function handleCharacteristicValueChanged(event) {
    let value = new TextDecoder().decode(event.target.value); //We want to decode byte to text

    for (let c of value) { //we receve 20 bytes per 20 bytes, let's make one string until we reach \n
        if (c === '\n') { //Be careful, now we need to add a line break when we use the serial monitor
            let data = readBuffer.trim();
            readBuffer = '';

            if (data) {
                receive(data);
            }
        }
        else {
            readBuffer += c;
        }
    }
}
