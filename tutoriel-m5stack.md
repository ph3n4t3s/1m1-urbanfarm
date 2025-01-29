# Tutoriel M5Stack EARTH : Mesure de l'Humidité du Sol

## Introduction @showdialog

Dans ce tutoriel, nous allons apprendre à utiliser le capteur M5Stack EARTH pour mesurer l'humidité du sol. Ce capteur est essentiel pour notre micro-serre, car il nous permet de savoir quand les plantes ont besoin d'eau.

### Objectifs
- Connecter le M5Stack EARTH au MicroBit
- Lire les valeurs d'humidité
- Créer un programme de surveillance
- Afficher des alertes visuelles

## Étape 1 : Connexion du Matériel @showdialog

1. **Préparation des composants**
   - 1 MicroBit V2
   - 1 capteur M5Stack EARTH
   - 4 câbles de connexion
   - 1 câble micro-USB

2. **Schéma de connexions**
> Faites un shéma de connection selon les indications suivantes :

   ``` 
   MicroBit          M5Stack EARTH
   GND         ->    GND
   3V3         ->    5V
   P0          <-    D OUT
   P1          <-    A OUT
   ```

3. **Câblez le capteur selon le schéma de connexions**
   


## Étape 2 : Premier Programme en Blocs@showdialog

Créez le programme suivant :

```blocks @showhint
let humidite = 0
basic.forever(function () {
    // Lecture de la valeur analogique
    humidite = pins.analogReadPin(AnalogPin.P1)
    
    // Affichage selon l'humidité
    if (humidite < 500) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    
    // Pause pour stabiliser la lecture
    basic.pause(1000)
})
```

### Explication du Code
- La broche P1 lit une valeur entre 0 (très humide) et 1023 (très sec)
- Nous utilisons 500 comme seuil initial
- Les icônes indiquent si le sol est trop sec ou suffisamment humide

## Étape 3 : Calibration du Capteur @showdialog

Pour obtenir des mesures plus précises, ajoutons une calibration :

```blocks @showhint
let valeurAir = 0
let valeurEau = 0
let humidite = 0
let pourcentage = 0

input.onButtonPressed(Button.A, function () {
    // Calibration "sec" (dans l'air)
    basic.showString("AIR")
    basic.pause(3000)
    valeurAir = pins.analogReadPin(AnalogPin.P1)
    basic.showIcon(IconNames.Yes)
})

input.onButtonPressed(Button.B, function () {
    // Calibration "humide" (dans l'eau)
    basic.showString("EAU")
    basic.pause(3000)
    valeurEau = pins.analogReadPin(AnalogPin.P1)
    basic.showIcon(IconNames.Yes)
})

basic.forever(function () {
    // Lecture de l'humidité
    humidite = pins.analogReadPin(AnalogPin.P1)
    
    // Calcul du pourcentage
    pourcentage = Math.map(humidite, valeurAir, valeurEau, 0, 100)
    
    // Affichage de l'état
    if (pourcentage < 30) {
        basic.showIcon(IconNames.Sad)
    } else if (pourcentage > 80) {
        basic.showIcon(IconNames.Surprised)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    
    basic.pause(1000)
})
```

### Procédure de Calibration
1. Appuyez sur A avec le capteur dans l'air (très sec)
2. Appuyez sur B avec le capteur dans l'eau (très humide)
3. Le capteur est maintenant calibré pour ces valeurs extrêmes

## Étape 4 : Ajout de la Communication Série @showdialog

Pour suivre les mesures sur l'ordinateur :

```blocks @showhint
basic.forever(function () {
    humidite = pins.analogReadPin(AnalogPin.P1)
    pourcentage = Math.map(humidite, valeurAir, valeurEau, 0, 100)
    
    // Envoi des données via USB
    serial.writeValue("humidite", pourcentage)
    
    basic.pause(1000)
})
```

### Visualisation des Données
1. Connectez le MicroBit via USB
2. Ouvrez l'éditeur de données série dans MakeCode
3. Observez les variations d'humidité en temps réel

## Transition vers Python @showdialog

Une fois que vous maîtrisez la version en blocs, passez à la version Python :

```python
from microbit import *
import math

# Variables globales
valeur_air = 1023  # Valeur à sec
valeur_eau = 0     # Valeur dans l'eau

def calibrer_air():
    global valeur_air
    display.scroll("AIR")
    sleep(3000)
    valeur_air = pin1.read_analog()
    display.show(Image.YES)

def calibrer_eau():
    global valeur_eau
    display.scroll("EAU")
    sleep(3000)
    valeur_eau = pin1.read_analog()
    display.show(Image.YES)

def calculer_pourcentage(valeur):
    return ((valeur_air - valeur) / (valeur_air - valeur_eau)) * 100

# Programme principal
while True:
    if button_a.was_pressed():
        calibrer_air()
    
    if button_b.was_pressed():
        calibrer_eau()
    
    humidite = pin1.read_analog()
    pourcentage = calculer_pourcentage(humidite)
    
    # Affichage de l'état
    if pourcentage < 30:
        display.show(Image.SAD)
    elif pourcentage > 80:
        display.show(Image.SURPRISED)
    else:
        display.show(Image.HAPPY)
    
    # Communication série
    print(f"Humidité : {pourcentage:.1f}%")
    
    sleep(1000)
```

## Défis Supplémentaires

1. **Mode Économie d'Énergie**
   - Réduisez la fréquence des mesures
   - Utilisez le mode veille
   - Optimisez l'affichage

2. **Alarme Intelligente**
   - Détectez les changements rapides
   - Prédisez les besoins d'arrosage
   - Créez des alertes personnalisées

3. **Analyse Avancée**
   - Calculez les moyennes mobiles
   - Détectez les tendances
   - Générez des rapports quotidiens

## Prochaines Étapes
- [Tutoriel DHT11](tutoriel-dht11)
- [Tutoriel LED RGB](tutoriel-led-rgb)

