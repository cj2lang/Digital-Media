const int buttonPins[] = {13, 12, 11, 10, 9};
const int ledPins[] = {6, 5, 4, 3, 2};
const int numButtons = sizeof(buttonPins) / sizeof(buttonPins[0]);
const int floors[] = {5, 4, 3, 2, 1};

int buttonStates[numButtons];

void setup() {
  Serial.begin(57600);
  for (int i = 0; i < numButtons; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
    buttonStates[i] = digitalRead(buttonPins[i]);
  }
}

void loop() {
  for (int i = 0; i < numButtons; i++) {
    int currentState = digitalRead(buttonPins[i]);
    if (currentState == LOW && buttonStates[i] == HIGH) {
      Serial.println(floors[i]);
      buttonStates[i] = LOW;
    } else if (currentState == HIGH && buttonStates[i] == LOW) {
      buttonStates[i] = HIGH;
    }
  }
  delay(50);

  if (Serial.available() > 0) {
    int floorLed = Serial.parseInt();
    if (floorLed > 0 && floorLed <= 5) {
      for (int i = 0; i < numButtons; i++) {
        digitalWrite(ledPins[i], (floors[i] == floorLed) ? HIGH : LOW);
      }
    }
  }
}
