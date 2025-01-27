# Problèmes Matériels

### 1. Capteur DHT11

#### Problème : Lectures Invalides
Symptômes :
- Valeurs de température > 50°C ou < 0°C
- Valeurs d'humidité > 90% ou < 20%
- Lectures intermittentes

Solutions :
1. Vérification de l'Alimentation
```python
def verifier_alimentation_dht11():
    # La tension devrait être stable à ~3.3V
    tension = pin0.read_analog()
    print(f"Tension mesurée: {tension}")
    return tension > 900  # ~3V minimum nécessaire
```

2. Test de Continuité
```python
def tester_connexion_dht11():
    try:
        pin0.write_digital(1)
        sleep(100)
        resultat = pin0.read_digital()
        pin0.write_digital(0)
        return resultat == 1
    except:
        return False
```

3. Programme de Diagnostic
```python
def diagnostiquer_dht11():
    erreurs = 0
    valeurs = []
    
    for _ in range(5):
        try:
            temp = dht11.temperature()
            hum = dht11.humidity()
            if temp is not None and hum is not None:
                valeurs.append((temp, hum))
            else:
                erreurs += 1
        except:
            erreurs += 1
        sleep(2000)
    
    if erreurs > 2:
        print("DHT11 instable - Vérifier les connexions")
    elif len(valeurs) > 0:
        temp_moy = sum(t for t, _ in valeurs) / len(valeurs)
        hum_moy = sum(h for _, h in valeurs) / len(valeurs)
        print(f"Moyennes - Temp: {temp_moy}°C, Hum: {hum_moy}%")
```

### 2. Capteur M5Stack EARTH

#### Problème : Lectures Erratiques
Symptômes :
- Valeurs qui fluctuent rapidement
- Pas de changement malgré l'humidité
- Lectures extrêmes (0 ou 1023)

Solutions :
1. Calibration du Capteur
```python
class CalibrationSol:
    def __init__(self, pin_analogique):
        self.pin = pin_analogique
        self.val_sec = 1023
        self.val_humide = 0
    
    def calibrer(self):
        display.scroll("SEC")
        sleep(5000)
        self.val_sec = self.pin.read_analog()
        
        display.scroll("HUMIDE")
        sleep(5000)
        self.val_humide = self.pin.read_analog()
        
        self.sauvegarder_calibration()
    
    def sauvegarder_calibration(self):
        # Sauvegarde dans la mémoire flash si disponible
        print(f"SEC:{self.val_sec},HUMIDE:{self.val_humide}")
```

2. Filtrage des Valeurs
```python
class FiltreLectures:
    def __init__(self, taille_buffer=5):
        self.buffer = []
        self.taille_max = taille_buffer
    
    def ajouter_lecture(self, valeur):
        self.buffer.append(valeur)
        if len(self.buffer) > self.taille_max:
            self.buffer.pop(0)
    
    def obtenir_moyenne(self):
        if not self.buffer:
            return None
        return sum(self.buffer) / len(self.buffer)
```

### 3. LED RGB

#### Problème : Couleurs Incorrectes
Symptômes :
- Couleurs mélangées incorrectement
- Une ou plusieurs couleurs ne fonctionnent pas
- Scintillement

Solutions :
1. Test des Canaux
```python
def tester_canaux_rgb():
    pins_rgb = [pin8, pin9, pin10]  # R, G, B
    
    for i, pin in enumerate(['Rouge', 'Vert', 'Bleu']):
        print(f"Test {pin}...")
        for intensite in range(0, 1024, 256):
            pins_rgb[i].write_analog(intensite)
            sleep(500)
        pins_rgb[i].write_analog(0)
```

2. Vérification PWM
```python
def verifier_pwm():
    frequences = [100, 500, 1000]  # Hz
    for freq in frequences:
        for intensite in range(0, 1024, 100):
            pin8.write_analog(intensite)
            sleep(1000 // freq)
```
