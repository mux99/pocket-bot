#include <Servo.h>
#include <Wire.h>

// Connections
//TX -> Bluetooth RX
//RX -> Bluetooth TX
#define B_state A6 // Bluetooth State 

#define S1 2 // Servo 1
#define S2 3 // Servo 2

#define BTN_LED 4 // base of button LED transistor

#define M_in1 8 // Motor controller INT1
#define M_in2 7 // Motor controller INT2
#define M_in3 6 // Motor controller INT3
#define M_in4 5 // Motor controller INT4
#define M_en1 10 // Motor controller EN1
#define M_en2 9 // Motor controller EN2

#define Hall1 A1 // Hall sensor 1
#define Hall2 A2 // Hall sensor 2
#define Hall3 A3 // Hall sensor 3

//SDA () -> Accelerometer SDA
//SCL () -> Accelerometer SCL
int ADXL345 = 0x53; // The ADXL345 sensor I2C address
float X_out, Y_out, Z_out;  // Outputs

#define Bat A7 // Batery Tention bridge | 12V -> R1=100Ω R2=220Ω


Servo servo1;
Servo servo2;

void setup() {
  //bluetooth setup
  Serial1.begin(9600);
  pinMode(B_state, INPUT);

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
  pinMode(M_en1, OUTPUT);
  pinMode(M_en2, OUTPUT);

  //motor default direction
  digitalWrite(M_in1, HIGH);
  digitalWrite(M_in2, LOW);
  digitalWrite(M_in3, HIGH);
  digitalWrite(M_in4, LOW);

  //setup button LED
  pinMode(BTN_LED, OUTPUT);
  digitalWrite(BTN_LED, HIGH);

  //setup acclelerometer
  Wire.begin();
  Wire.beginTransmission(ADXL345);
  Wire.write(0x2D);
  Wire.write(8);
  Wire.endTransmission();
  delay(10);
}

void loop() {
  //await bluetooth connection
  if (analogRead(B_state) < 200){
    digitalWrite(BTN_LED, !digitalRead(BTN_LED));
    analogWrite(M_en1,0);
    analogWrite(M_en2,0);
    delay(200);
    return;
  }
  digitalWrite(BTN_LED, HIGH);

  //read commands if avaliable
  while (Serial1.available() > 4) {
    char cmm[3];
    Serial1.readBytes(cmm, 3);
    int value = Serial1.parseInt();
    parseCommand(cmm, value);

    //clear CR & LF from buffer
    if (Serial.available() < 3) {
      Serial1.read();
      delay(20);
      Serial1.read();
    }
  }
}

int get_motor_speed(int percentage) {
  if (percentage == 0) return 0;
  return int(abs(63.75 + (float)percentage * 1.9125));
}

void parseCommand(String cmm, int value) {
  if (cmm == "LFT") {
    analogWrite(M_en2,get_motor_speed(value));
    if (value < 0) {
      digitalWrite(M_in3, LOW);
      digitalWrite(M_in4, HIGH);
    } else {
      digitalWrite(M_in3, HIGH);
      digitalWrite(M_in4, LOW);
    }
  }
  
  else if (cmm == "RGT") {
    analogWrite(M_en1,get_motor_speed(value));
    if (value < 0){
      digitalWrite(M_in1, LOW);
      digitalWrite(M_in2, HIGH);
    } else {
      digitalWrite(M_in1, HIGH);
      digitalWrite(M_in2, LOW);
    }
  }
  
  else if (cmm == "ARM") {
    servo1.write(value*30);
    servo2.write(value*30);
  }
  
  else if (cmm == "BAT") {
    Serial1.print("BAT");
    Serial1.println(analogRead(Bat));
  }

  else if (cmm == "LIV") {
    int lives = 0;
    lives += digitalRead(Hall1);
    lives += digitalRead(Hall2);
    lives += digitalRead(Hall3);
    Serial1.print("LIV");
    Serial1.println(lives);
  }

  else if (cmm == "FLP") {
    Wire.beginTransmission(ADXL345);
    Wire.write(0x36);
    Wire.endTransmission(false);
    Wire.requestFrom(ADXL345, 2, true);
    Z_out = ( Wire.read()| Wire.read() << 8);
    Z_out = Z_out/256;

    Serial1.print("FLP");
    if (Z_out >= 0) {
      Serial1.println("0");    
    }
    else {
      Serial1.println("1");
    }
  }
}
