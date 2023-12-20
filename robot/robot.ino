#include <Servo.h>
#include <Wire.h>
#include <string.h>

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
int battery = 0;

#define Bat A7 // Batery Tention bridge | 12V -> R1=100Ω R2=220Ω


Servo servo1;
Servo servo2;

void setup() {
  //bluetooth setup
  Serial.begin(9600);
  Serial1.begin(9600);
  pinMode(B_state, INPUT);

  //servo setup
  servo1.attach(S1);
  servo1.write(90);
  servo2.attach(S2);
  servo2.write(90);

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
  delay(20);

  //read commands if avaliable
  char out[255];
  out[0] = NULL;
  while (Serial1.available() > 0) {
    Serial.println(Serial1.available());
    char cmm[4];
    cmm[3] = NULL;

    Serial1.readBytes(cmm, 3);
    int value = Serial1.parseInt();
    parseCommand(cmm, value, out);

    battery = (int(100*(analogRead(Bat)-385)/72) + (battery*8))/9;

    Serial.println(Serial1.available());
    //clear CR & LF from buffer
    if (Serial1.available() < 3) {
      Serial1.read();
      delay(1);
      Serial1.read();

      if (out[0] != NULL) {
        Serial1.println(out);
      }
    }
    delay(5);
  }
}

int get_motor_speed(int percentage) {
  if (percentage == 0) return 0;
  return int(abs(63.75 + (float)percentage * 1.9125));
}

void parseCommand(char* cmm, int value, char* out) {
  if (strcmp(cmm,"LFT") == 0) {
    analogWrite(M_en1,get_motor_speed(value));
    if (value < 0) {
      digitalWrite(M_in1, LOW);
      digitalWrite(M_in2, HIGH);
    } else {
      digitalWrite(M_in1, HIGH);
      digitalWrite(M_in2, LOW);
    }
  }
  
  else if (strcmp(cmm,"RGT") == 0) {
    Serial.println("test");
    analogWrite(M_en2,get_motor_speed(value));
    if (value < 0){
      digitalWrite(M_in3, LOW);
      digitalWrite(M_in4, HIGH);
    } else {
      digitalWrite(M_in3, HIGH);
      digitalWrite(M_in4, LOW);
    }
  }
  
  else if (strcmp(cmm,"ARM") == 0) {
    servo1.write(90+(value*-30));
    servo2.write(90+(value*30));
  }
  
  else if (strcmp(cmm,"BAT") == 0) {
    strcat(out,"BAT");
    char buf[16];
    itoa(battery, buf, 10);
    strcat(out, buf);
  }

  else if (strcmp(cmm,"LIV") == 0) {
    int lives = 0;
    lives += 1-digitalRead(Hall1);
    lives += 1-digitalRead(Hall2);
    lives += 1-digitalRead(Hall3);
    strcat(out,"LIV");
    char buf[16];
    itoa(lives, buf, 10);
    strcat(out, buf);
  }

  else if (strcmp(cmm,"FLP") == 0) {
    Wire.beginTransmission(ADXL345);
    Wire.write(0x36);
    Wire.endTransmission(false);
    Wire.requestFrom(ADXL345, 2, true);
    Z_out = ( Wire.read()| Wire.read() << 8);
    Z_out = Z_out/256;

    strcat(out,"FLP");
    if (Z_out >= 0) {
      strcat(out,"0");    
    }
    else {
      strcat(out,"1");
    }
  }
}
