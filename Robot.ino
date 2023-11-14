#include <Servo.h>
#include <SoftwareSerial.h>

#define ROBOT_NAME "RobotName"
#define BLUETOOTH_SPEED 57600

// Connections
//TX (1) -> Bluetooth RX
//RX (2) -> Bluetooth TX
SoftwareSerial bluetooth(2, 1);
#define B_state 12 // Bluetooth State 

#define M_in1 2 // Motor controller INT1
#define M_in2 3 // Motor controller INT2
#define M_in3 4 // Motor controller INT3
#define M_in4 8 // Motor controller INT4
#define M_en1 9 // Motor controller EN1
#define M_en2 10 // Motor controller EN2

#define S1 6 // Servo 1
#define S2 7 // Servo 2

//A0 () -> Hall 1
//A1 () -> Hall 2
//A2 () -> Hall 3

//SDA () -> Accelerometer SDA
//SCL () -> Accelerometer SCL

//A7 () -> Batery Tention bridge | 12V -> R1=100Ω R2=220Ω


Servo servo1;
Servo servo2;

void setup() {
  //bluetooth setup
  bluetooth.begin(9600);
  bluetooth.setTimeout(50);
  pinMode(B_state, OUTPUT);

  //servo setup
  servo1.attach(S1);
  servo1.write(0);
  servo2.attach(S2);
  servo2.write(0);

  //motor control
  pinMode(M_in1, OUTPUT);
  pinMode(M_in2, OUTPUT);
  pinMode(M_in3, OUTPUT);
  pinMode(M_in4, OUTPUT);

  //motor default direction
  digitalWrite(M_in1, HIGH);
  digitalWrite(M_in2, LOW);
  digitalWrite(M_in3, HIGH);
  digitalWrite(M_in4, LOW);

  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {

  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
