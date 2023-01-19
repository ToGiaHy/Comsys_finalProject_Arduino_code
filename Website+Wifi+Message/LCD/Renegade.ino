#include <ESP8266WiFi.h>
#include <Servo.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
LiquidCrystal_I2C lcd(0x27,16,2);
Servo servo;
int servoRead = 0;
int buttonState = 1; 
int buttonStateOld;
AsyncWebServer server(80);
const char* ssid = "SNOWMAN"; //wifi name
const char* password = "Batman1210"; //wifi password 
const char* PARAM_INPUT_1 = "input1";
//web application
const char index_html[] PROGMEM = R"rawliteral(<!DOCTYPE HTML><html><head><title>Smart Notice Board</title><meta name="viewport" content="width=device-width, initial-scale=5"><p><font size="9" face="sans-serif"><h1>Mission Report</h1></font></p></head><body><center><form action="/get">Enter protocol:<input type="text" name="input1"><input type="submit" value="Send"></form><br></center></body></html>)rawliteral";
//display if the nodeMcu is unable to host the ip
void notFound(AsyncWebServerRequest *request) {
request->send(404, "text/plain", "Not found");
}
void setup(){
//button
//setup the button input
pinMode(D3, INPUT);
//servo
//setup the servo pin
servo.attach(2); //D4
//Specify the baud the NodeMcu uses with is 115200
Serial.begin(115200);
//Connect the lcd to pin D2 D1
Wire.begin(D2,D1);
lcd.begin();
lcd.clear();
lcd.print("Mission Report");
//use wifi function of NodeMcu
WiFi.mode(WIFI_STA);
WiFi.begin(ssid, password);
if (WiFi.waitForConnectResult() != WL_CONNECTED) {
Serial.println("WiFi Failed!");
return;
}
Serial.println();
//Print local ip address broadcasted from NodeMcu
Serial.print("IP Address: ");
Serial.println(WiFi.localIP());
server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
request->send_P(200, "text/html", index_html);
});
server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
String message;
String inputParam;
//Get message sent from web server
if (request->hasParam(PARAM_INPUT_1)) {
message = request->getParam(PARAM_INPUT_1)->value();
inputParam = PARAM_INPUT_1;
lcd.clear();
lcd.setCursor(0,0);
lcd.print(message);
//LCD
//Display the text from the left this is to make the buffer time not weird to look at
servo.write(0);
}
else {
message = "No message sent";
inputParam = "none";
}
Serial.println(message);
request->send(200,"text/html",index_html);
});
server.onNotFound(notFound);
server.begin();

}

void loop() {
//Control the opening and closing mechanism manually
buttonStateOld = digitalRead(D3);

    if (buttonState == 0 && buttonStateOld == 1) {
      if(servoRead == 0){
        servo.write(180);
        servoRead = 1;
      }
     else{
        servo.write(0);
        servoRead = 0;
      }
}
buttonState = buttonStateOld;
//
}
