import { isDragging_conf, distanceJoystick_conf, angleJoystick_conf } from './config.js'

let isDragging = isDragging_conf;
let distanceJoystick = distanceJoystick_conf;
let angleJoystick = angleJoystick_conf;

export function moveJoystick(e) {
    if (isDragging) {
        const rect = outerCircle.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        const maxDistance = rect.width / 2;
        let distance = (Math.hypot(offsetX, offsetY) / maxDistance) * 100;
        distance = Math.min(distance, 100);
        let logicAngle = (Math.atan2(offsetY, offsetX) * 180) / Math.PI;
        let displayAngle = (logicAngle + 360 + 90) % 360;
        displayAngle = 360 - displayAngle;
        updatePosition(displayAngle, distance);
        const limitedX = Math.cos((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;
        const limitedY = Math.sin((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;
        joystick.style.transform = `translate(-50%, -50%) translate(${limitedX}px, ${limitedY}px)`;
        console.log(displayAngle);
        console.log(distance);
    }
}

export function startDrag(e) {
    isDragging = true;
    moveJoystick(e);
}

export function endDrag(e) {
    if (isDragging) {
        isDragging = false;
        resetJoystickPosition();
    }
}

export function updatePosition(angle, distance) {
    angleJoystick = angle;
    distanceJoystick = distance;
    console.log(calculateMotorSpeeds(angleJoystick, distanceJoystick));
}

export function resetJoystickPosition() {
    joystick.style.transform = 'translate(-50%, -50%) translate(0, 0)';
    updatePosition(0, 0);
}

export function calculateMotorSpeeds(angle, distance) {
    const eq1 = Math.cos((angle * Math.PI) / 90) * distance;
    const eq2 = Math.cos(((90 + angle) * Math.PI) / 90) * distance;
    let left_speed, right_speed;
    if (angle < 90) {
      left_speed = eq1;
      right_speed = distance;
    } else if (angle < 180) {
      left_speed = -distance;
      right_speed = eq2;
    } else if (angle < 270) {
      left_speed = eq2;
      right_speed = -distance;
    } else {
      left_speed = distance;
      right_speed = eq1;
    }
    return { left_speed, right_speed };
}