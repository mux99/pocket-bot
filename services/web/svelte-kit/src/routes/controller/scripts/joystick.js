import { updateSpeed, updateArm } from './blt.js';

let isDragging_boolean = false;

export function moveJoystick(e) {
    if (isDragging_boolean) {
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
    }
}

export function startDrag(e) {
  isDragging_boolean = true;
  moveJoystick(e, isDragging_boolean);
}

export function activateArms(activate_bool) {
  updateArm(activate_bool.toString());
}

export function endDrag(e) {
    if (isDragging_boolean) {
      isDragging_boolean = false;
        resetJoystickPosition();
    }
}

export function updatePosition(angle, distance) {
    calculateMotorSpeeds(angle, distance);
}

export function resetJoystickPosition() {
    joystick.style.transform = 'translate(-50%, -50%) translate(0, 0)';
    updateSpeed("0", "0");
}

export function calculateMotorSpeeds(angle, distance) {
    const eq1 = ((-angle*distance)/0.9)+100;
    const eq2 = ((angle*distance)/0.9)+100;
    let left_speed, right_speed;
    if (angle < 90) {
      left_speed = eq1;
      right_speed = 100;
    } else if (angle < 180) {
      left_speed = -100;
      right_speed = eq1;
    } else if (angle < 270) {
      left_speed = eq2;
      right_speed = -100;
    } else {
      left_speed = 100;
      right_speed = eq2;
    }
    updateSpeed(left_speed.toFixed(0).toString(), right_speed.toFixed(0).toString());
    return { left_speed, right_speed };
}