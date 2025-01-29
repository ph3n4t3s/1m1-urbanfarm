# Tutoriel DHT11 : Surveillance de l'Environnement de la Micro-Serre

## Introduction @showdialog

La température et l'humidité de l'air sont comme le "climat" de notre micro-serre. Tout comme nous nous sentons mieux dans une pièce ni trop chaude ni trop froide, les plantes ont besoin d'un environnement équilibré pour prospérer. Le capteur DHT11 va nous permettre de créer ce climat idéal.

## Comprendre le DHT11 @showdialog

Le DHT11 est un peu comme une mini-station météo. Il mesure deux choses importantes :
1. **La température** (entre 0°C et 50°C)
   - Comme un thermomètre digital
   - Précision de ±2°C

2. **L'humidité de l'air** (entre 20% et 90%)
   - Comme un hygromètre
   - Précision de ±5%

## Étape 1 : Installation du Matériel @showdialog

### Composants Nécessaires
- 1 MicroBit V2
- 1 capteur DHT11
- 3 câbles de connexion
- 1 câble micro-USB

### Schéma de Connexion

``` @showhint
MicroBit    ->    DHT11
GND         ->    GND (-)
3V3         ->    VCC (+)
P0          <-    DATA
```

### Conseils d'Installation
- Les connexions doivent être stables et bien serrées
- Évitez de toucher la grille de mesure du capteur
- Placez le capteur loin des sources de chaleur directe

## Étape 2 : Premier Programme en Blocs @showdialog

### Installation de l'Extension
1. Cliquez sur "Extensions" dans MakeCode
2. Recherchez "DHT11"
3. Ajoutez l'extension à votre projet

### Programme de Base

```blocks @showhint
// Déclaration des variables
let temperature = 0
let humidite = 0

// Configuration initiale
basic.showString("DHT11")

// Boucle principale
basic.forever(function () {
    // Lecture des données
    temperature = dht11.temperature()
    humidite = dht11.humidity()
    
    // Affichage alterné
    basic.showString("T:")
    basic.showNumber(temperature)
    basic.pause(1000)
    
    basic.showString("H:")
    basic.showNumber(humidite)
    basic.pause(1000)
})
```

### Explication du Code
Notre programme fait trois choses simples :
1. Il lit la température et l'humidité
2. Il affiche "T:" suivi de la température
3. Il affiche "H:" suivi de l'humidité

## Étape 3 : Amélioration avec la Gestion d'Erreurs @showdialog

Le DHT11 peut parfois avoir du mal à lire les données. Ajoutons une vérification :

```blocks @showhint
let temperature = 0
let humidite = 0
let lecture_valide = false

basic.forever(function () {
    // Tentative de lecture
    temperature = dht11.temperature()
    humidite = dht11.humidity()
    
    // Vérification des valeurs
    lecture_valide = true
    if (temperature < 0 || temperature > 50) {
        lecture_valide = false
    }
    if (humidite < 20 || humidite > 90) {
        lecture_valide = false
    }
    
    // Affichage selon la validité
    if (lecture_valide) {
        // Données valides
        basic.showIcon(IconNames.Yes)
        basic.pause(500)
        
        // Affichage des valeurs
        basic.showString("T:")
        basic.showNumber(temperature)
        basic.pause(1000)
        basic.showString("H:")
        basic.showNumber(humidite)
    } else {
        // Erreur de lecture
        basic.showIcon(IconNames.No)
        basic.pause(1000)
    }
    
    // Attente avant la prochaine lecture
    basic.pause(2000)
})
```

## Étape 4 : Surveillance Intelligente @showdialog

Créons un système qui nous alerte quand les conditions ne sont pas idéales :

```blocks @showhint
// Configuration des seuils
let TEMP_MIN = 18
let TEMP_MAX = 30
let HUM_MIN = 40
let HUM_MAX = 80

function verifierConditions() {
    let alerte = false
    
    // Vérification de la température
    if (temperature < TEMP_MIN) {
        basic.showArrow(ArrowNames.South)  // Trop froid
        alerte = true
    } else if (temperature > TEMP_MAX) {
        basic.showArrow(ArrowNames.North)  // Trop chaud
        alerte = true
    }
    
    // Vérification de l'humidité
    if (humidite < HUM_MIN) {
        music.playTone(262, music.beat(BeatFraction.Quarter))  // Alerte sonore
        alerte = true
    } else if (humidite > HUM_MAX) {
        music.playTone(523, music.beat(BeatFraction.Quarter))  // Alerte sonore
        alerte = true
    }
    
    // Tout va bien
    if (!alerte) {
        basic.showIcon(IconNames.Happy)
    }
}
```

## Étape 5 : Enregistrement des Données @showdialog

Pour suivre l'évolution du climat de notre micro-serre :

```blocks @showhint
// Envoi des données via série
serial.writeValue("temperature", temperature)
serial.writeValue("humidite", humidite)

// Ajout d'un horodatage
serial.writeValue("temps", input.runningTime())
```

## Version Python @showdialog

```python @showhint
from microbit import *
import dht11

# Configuration
TEMP_MIN = 18
TEMP_MAX = 30
HUM_MIN = 40
HUM_MAX = 80

class CapteurEnvironnement:
    def __init__(self, pin_data=pin0):
        self.capteur = dht11.DHT11(pin_data)
        self.derniere_lecture = {"temp": None, "hum": None}
        self.erreurs_consecutives = 0
    
    def lire_donnees(self):
        """Lit les données du capteur avec gestion d'erreurs"""
        try:
            temperature = self.capteur.read_temperature()
            humidite = self.capteur.read_humidity()
            
            # Vérification des valeurs
            if (0 <= temperature <= 50) and (20 <= humidite <= 90):
                self.derniere_lecture = {
                    "temp": temperature,
                    "hum": humidite
                }
                self.erreurs_consecutives = 0
                return temperature, humidite
            else:
                raise ValueError("Valeurs hors limites")
                
        except Exception as e:
            self.erreurs_consecutives += 1
            print(f"Erreur de lecture ({self.erreurs_consecutives})")
            if self.erreurs_consecutives > 3:
                display.show(Image.NO)
            return None, None
    
    def verifier_conditions(self, temp, hum):
        """Vérifie si les conditions sont optimales"""
        if temp is None or hum is None:
            return "Erreur"
            
        if temp < TEMP_MIN:
            return "Trop froid"
        elif temp > TEMP_MAX:
            return "Trop chaud"
        elif hum < HUM_MIN:
            return "Air trop sec"
        elif hum > HUM_MAX:
            return "Air trop humide"
        else:
            return "Optimal"
    
    def afficher_etat(self, etat):
        """Affiche l'état sur l'écran LED"""
        if etat == "Optimal":
            display.show(Image.HAPPY)
        elif etat == "Erreur":
            display.show(Image.NO)
        else:
            display.show(Image.SAD)

# Programme principal
capteur = CapteurEnvironnement()

while True:
    # Lecture des données
    temp, hum = capteur.lire_donnees()
    
    # Vérification et affichage
    etat = capteur.verifier_conditions(temp, hum)
    capteur.afficher_etat(etat)
    
    # Communication série
    if temp is not None and hum is not None:
        print(f"{running_time()},T:{temp}°C,H:{hum}%,{etat}")
    
    # Attente avant prochaine lecture
    sleep(2000)
```

## Exercices Pratiques

### Exercice 1 : Calibration des Seuils
1. Mesurez les conditions pendant une journée
2. Notez les variations
3. Ajustez les seuils selon vos observations

### Exercice 2 : Journal Climatique
1. Créez un système d'enregistrement
2. Analysez les tendances
3. Identifiez les moments critiques

### Exercice 3 : Alertes Avancées
1. Ajoutez des alertes sonores
2. Créez des motifs d'affichage distincts
3. Implémentez des niveaux d'alerte

## Défis Créatifs

1. **Prévision des Tendances**
   - Calculez les moyennes mobiles
   - Détectez les changements rapides
   - Anticipez les besoins d'intervention

2. **Interface Utilisateur**
   - Créez un menu avec les boutons
   - Affichez des statistiques
   - Permettez la configuration des seuils

3. **Optimisation Énergétique**
   - Réduisez la fréquence des mesures
   - Implémentez un mode nuit
   - Gérez la consommation

## Prochaine Étape
- [Tutoriel LED RGB](lien-vers-tutoriel-led-rgb)

## Dépannage

### Problèmes Courants
1. **Lectures Invalides**
   - Vérifiez les connexions
   - Attendez 2 secondes entre les lectures
   - Évitez les interférences électriques

2. **Variations Brusques**
   - Éloignez des sources de chaleur
   - Protégez des courants d'air
   - Vérifiez l'alimentation

3. **Erreurs de Communication**
   - Contrôlez la qualité des câbles
   - Vérifiez la tension d'alimentation
   - Réinitialisez le MicroBit


