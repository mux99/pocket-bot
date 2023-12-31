import {calculateMotorSpeeds} from "src/routes/controller/scripts/joystick.js"

describe("Test controller", async () => {
    it("Test calculateMotorSpeeds", async () => {
        expect(calculateMotorSpeeds(0,-1)).toEqual([100, 100]); //full forward
        expect(calculateMotorSpeeds(0,1)).toEqual([-100, -100]); //full backward

        expect(calculateMotorSpeeds(-1,0)).toEqual([100, -100]); //full left
        expect(calculateMotorSpeeds(1,0)).toEqual([-100, 100]); //full right

        expect(calculateMotorSpeeds(0.5,0.5)).toEqual([-50, 0]); //diagonal forward
        expect(calculateMotorSpeeds(0.5,-0.5)).toEqual([0, 50]); //diagonal forward
        expect(calculateMotorSpeeds(-0.5,0.5)).toEqual([0, -50]); //diagonal forward
        expect(calculateMotorSpeeds(-0.5,-0.5)).toEqual([50, 0]); //diagonal forward

        //proper joystick values tested manually (to complicated to automate)
    });
});