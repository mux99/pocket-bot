import { updateSpeed, updateArm } from './blt.js';

let isDragging_boolean = false;

export function moveJoystick(e) {
    if (isDragging_boolean) {
        const rect = outerCircle.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        const maxDistance = rect.width/2;

        let distance = (Math.hypot(offsetX, offsetY) / maxDistance) * 100;
        distance = Math.min(distance, 100);
        let logicAngle = (Math.atan2(offsetY, offsetX) * 180) / Math.PI;
        let displayAngle = (logicAngle + 360 + 90) % 360;
        displayAngle = 360 - displayAngle;
        const limitedX = Math.cos((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;
        const limitedY = Math.sin((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;

        calculateMotorSpeeds((limitedX/maxDistance), (limitedY/maxDistance));

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

export function calculateMotorSpeeds(x, y) {
  let drive = -y;
  let rotate = -x;
  let maximum = Math.max(Math.abs(drive), Math.abs(rotate));
  let total = drive + rotate;
  let difference = drive - rotate;
  let left, right;
  if (drive >= 0) {
    if (rotate >= 0) {
      left = maximum;
      right = difference;
    } else {
      left = total;
      right = maximum;
    }
  } else {
    if (rotate >= 0) {
      left = total;
      right = -maximum;
    } else {
      left = -maximum;
      right = difference;
    }
  }
  left = Math.floor(left*100);
  right = Math.floor(right*100);
  updateSpeed(left.toFixed(0), right.toFixed(0));
  return [left, right];
}