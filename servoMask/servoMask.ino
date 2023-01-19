#include <Servo.h>;
Servo myservo1;
Servo myservo2;
int servoRead = 0;
int buttonState = 1; 
int buttonStateOld;
void setup() {
//set up button pin
pinMode(3, INPUT);
//servo pin setup
myservo1.attach(9);//servo right
myservo2.attach(10);//servo left
//servo default state
myservo1.write(90);
myservo2.write(0);
Serial.begin(9600);
}

void loop() {
//read button data
buttonStateOld = digitalRead(3);
//serial data print for checking
Serial.println(buttonStateOld);
//Input button state
    if (buttonState == 0 && buttonStateOld == 1) {
      //assign a value for each toggle
      if(servoRead == 0){
         myservo1.write(40);
         myservo2.write(50);
         servoRead = 1;
      }
      else{
         myservo1.write(90);
         myservo2.write(0);
         servoRead = 0; 
      }
}
buttonState = buttonStateOld;
}
