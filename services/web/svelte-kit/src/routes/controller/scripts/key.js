import { resetJoystickPosition, updatePosition  } from './joystick.js';

let joystickPosition_conf = { x: 0, y: 0};
let keysPressed_conf = { z: false, q: false, d: false, s: false};
const smoothingFactor = 0.1;

let joystickPosition = joystickPosition_conf;
let keysPressed = keysPressed_conf;

function handleKeyChanges() {
    const targetX = (keysPressed.d ? 1 : 0) - (keysPressed.q ? 1 : 0);
    const targetY = (keysPressed.s ? 1 : 0) - (keysPressed.z ? 1 : 0);

    joystickPosition.x += smoothingFactor * (targetX - joystickPosition.x);
    joystickPosition.y += smoothingFactor * (targetY - joystickPosition.y);

    const angle = Math.atan2(joystickPosition.y, joystickPosition.x);
    const distance = Math.min(outerCircle.clientWidth / 2, outerCircle.clientHeight / 2);

    updatePosition(angle, distance);

    const limitedX = Math.cos(angle) * distance;
    const limitedY = Math.sin(angle) * distance;
    joystick.style.transform = `translate(-50%, -50%) translate(${limitedX}px, ${limitedY}px)`;

    if (!(keysPressed.z || keysPressed.q || keysPressed.d || keysPressed.s)) {
      resetJoystickPosition();
    }
}

export function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (keysPressed.hasOwnProperty(key)) {
        keysPressed[key] = true;
        handleKeyChanges();
    }
}

export function handleKeyUp(event) {
    const key = event.key.toLowerCase();

    if (keysPressed.hasOwnProperty(key)) {
        keysPressed[key] = false;
        handleKeyChanges();
    }
}