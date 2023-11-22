#include <SoftwareSerial.h>

SoftwareSerial bluetooth(2,1); 

int ena = 9;
int enb = 10;

int in1 = 2;
int in2 = 3;
int in3 = 4;
int in4 = 8;

long int data;
long int command1 = 2;
long int command2 = 4;
long int command3 = 6;
long int command4 = 8;
long int command5 = 10;

char state = 0;

void setup(){
  Serial.begin(9600);
  bluetooth.begin(9600);

  pinMode(ena, OUTPUT);
  pinMode(enb, OUTPUT);

  pinMode(in1, OUTPUT);
  PinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  analogWrite(ena, 150);
  analogWrite(enb, 150);
  delay(1000);
}

void loop(){
  while(bluetooth.available()==0) ;
    if(bluetooth.available()>0){
      data = bluetooth.parseInt();
    }
  delay(1000);

  if(data == command1){ // vers l'avant
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
    digitalWrite(in3, LOW);
    digitalWrite(in4, HIGH);
    delay(1000);
  }

  if(data == command2){ // à gauche
    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);
    digitalWrite(in3, LOW);
    digitalWrite(in4, HIGH);
    delay(1000);
  }

  if(data == command3){ // à droite
    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);
    digitalWrite(in3, LOW);
    digitalWrite(in4, HIGH);
    delay(1000);
  }

  if (data == command4){ // arrière
    digitalWrite(in1, LOW);
    digitalWrite(in2, HIGH);
    digitalWrite(in3, HIGH);
    digitalWrite(in4, LOW);
    delay(1000);
  }

  if(data == command5){ // stop
    digitalWrite(in1, LOW);
    digitalWrite(in2, LOW);
    digitalWrite(in3, LOW);
    digitalWrite(in4, LOW);
  }
}
