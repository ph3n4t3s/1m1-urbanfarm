# Guide de dépannage - Micro-Serre MicroBit

## Table des Matières @showdialog
1. [Diagnostic Initial](https://makecode.microbit.org/#tutorial:github:ph3n4t3s/1m1-urbanfarm/diagnostic-initial)
2. [Problèmes Matériels](https://makecode.microbit.org/#tutorial:github:ph3n4t3s/1m1-urbanfarm/problemes-materiels)
3. [Problèmes Logiciels](https://makecode.microbit.org/#tutorial:github:ph3n4t3s/1m1-urbanfarm/problemes-logiciels)
4. [Outils de Diagnostic](https://makecode.microbit.org/#tutorial:github:ph3n4t3s/1m1-urbanfarm/outils-de-diagnostic)
5. [Maintenance Préventive](https://makecode.microbit.org/#tutorial:github:ph3n4t3s/1m1-urbanfarm/maintenance-preventive)


# Diagnostic Initial @showdialog

### Programme de Test Rapide
Utilisez ce programme pour vérifier rapidement tous les composants :

```python
from microbit import *
import dht11

class TesteurSysteme:
    def __init__(self):
        self.composants = {
            'dht11': {'pin': pin0, 'status': 'Non testé'},
            'sol': {'pin': pin1, 'status': 'Non testé'},
            'led_r': {'pin': pin8, 'status': 'Non testé'},
            'led_g': {'pin': pin9, 'status': 'Non testé'},
            'led_b': {'pin': pin10, 'status': 'Non testé'}
        }
    
    def tester_dht11(self):
        try:
            capteur = dht11.DHT11(self.composants['dht11']['pin'])
            temp = capteur.read_temperature()
            hum = capteur.read_humidity()
            
            if 0 <= temp <= 50 and 20 <= hum <= 90:
                self.composants['dht11']['status'] = 'OK'
                return True
            else:
                self.composants['dht11']['status'] = 'Hors limites'
                return False
        except:
            self.composants['dht11']['status'] = 'Erreur'
            return False
    
    def tester_capteur_sol(self):
        try:
            valeur = self.composants['sol']['pin'].read_analog()
            if 0 <= valeur <= 1023:
                self.composants['sol']['status'] = 'OK'
                return True
            else:
                self.composants['sol']['status'] = 'Hors limites'
                return False
        except:
            self.composants['sol']['status'] = 'Erreur'
            return False
    
    def tester_led(self):
        try:
            # Test séquentiel des couleurs
            for led in ['led_r', 'led_g', 'led_b']:
                pin = self.composants[led]['pin']
                pin.write_analog(1023)
                sleep(500)
                pin.write_analog(0)
                self.composants[led]['status'] = 'OK'
            return True
        except:
            for led in ['led_r', 'led_g', 'led_b']:
                self.composants[led]['status'] = 'Erreur'
            return False
    
    def executer_diagnostics(self):
        print("=== Début des tests ===")
        
        print("Test DHT11...")
        self.tester_dht11()
        
        print("Test capteur sol...")
        self.tester_capteur_sol()
        
        print("Test LED RGB...")
        self.tester_led()
        
        print("\nRésultats des tests:")
        for composant, info in self.composants.items():
            print(f"{composant}: {info['status']}")

# Exécution des tests
testeur = TesteurSysteme()
testeur.executer_diagnostics()
```

### Liste de Vérification Rapide
1. Alimentation
   - [ ] Tension USB stable (devrait être ~5V)
   - [ ] Connexions d'alimentation sécurisées
   - [ ] LED d'alimentation MicroBit allumée

2. Connexions
   - [ ] Tous les câbles fermement connectés
   - [ ] Pas de courts-circuits visibles
   - [ ] Pas de fils dénudés qui se touchent

3. Environnement
   - [ ] Température ambiante normale (15-30°C)
   - [ ] Pas d'humidité excessive
   - [ ] Pas d'interférences électromagnétiques proches

# Problèmes Matériels @showdialog

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

# Problèmes Logiciels @showdialog

### 1. Problèmes de Communication

#### Programme de Test de Communication
```python
def tester_communication():
    while True:
        try:
            # Envoi de données test
            print("TEST,1,2,3")
            
            # Attente réponse
            if uart.any():
                reponse = uart.readline()
                print("Reçu:", reponse)
            
            sleep(1000)
        except Exception as e:
            print("Erreur:", str(e))
```

### 2. Problèmes de Mémoire

#### Gestionnaire de Mémoire
```python
class GestionnaireMemoireSerre:
    def __init__(self):
        self.donnees = []
        self.limite_donnees = 100
    
    def ajouter_donnee(self, donnee):
        if len(self.donnees) >= self.limite_donnees:
            self.donnees.pop(0)  # Supprime la plus ancienne
        self.donnees.append(donnee)
    
    def nettoyer_memoire(self):
        self.donnees.clear()
        gc.collect()  # Nettoyage mémoire si disponible
```

# Outils de Diagnostic @showdialog

### 1. Moniteur Système
```python
class MoniteurSysteme:
    def __init__(self):
        self.debut_execution = running_time()
        self.erreurs = {}
    
    def log_erreur(self, composant, erreur):
        if composant not in self.erreurs:
            self.erreurs[composant] = []
        self.erreurs[composant].append({
            'temps': running_time(),
            'erreur': str(erreur)
        })
    
    def afficher_rapport(self):
        temps_total = (running_time() - self.debut_execution) / 1000
        print(f"Temps d'exécution: {temps_total}s")
        
        for composant, erreurs in self.erreurs.items():
            print(f"\n{composant}:")
            for err in erreurs[-5:]:  # 5 dernières erreurs
                print(f"- {err['erreur']}")
```

### 2. Analyseur de Performance
```python
class AnalyseurPerformance:
    def __init__(self):
        self.temps_execution = {}
    
    def mesurer_temps(self, fonction):
        debut = running_time()
        try:
            fonction()
        finally:
            duree = running_time() - debut
            nom = fonction.__name__
            if nom not in self.temps_execution:
                self.temps_execution[nom] = []
            self.temps_execution[nom].append(duree)
    
    def rapport_performance(self):
        for nom, temps in self.temps_execution.items():
            moy = sum(temps) / len(temps)
            print(f"{nom}: {moy}ms en moyenne")
```

# Maintenance Préventive @showdialog

## 1. Planning de Maintenance @showdialog
- Quotidien : Vérification visuelle
- Hebdomadaire : Test des capteurs
- Mensuel : Calibration complète

## 2. Programme de Maintenance Automatique @showdialog
```python
class MaintenanceAutomatique:
    def __init__(self):
        self.derniere_maintenance = running_time()
        self.interval_maintenance = 86400000  # 24 heures
    
    def verifier_maintenance(self):
        if running_time() - self.derniere_maintenance >= self.interval_maintenance:
            self.executer_maintenance()
    
    def executer_maintenance(self):
        # Test des composants
        testeur = TesteurSysteme()
        testeur.executer_diagnostics()
        
        # Nettoyage mémoire
        gc.collect()
        
        # Mise à jour timestamp
        self.derniere_maintenance = running_time()
        
        print("Maintenance complétée")
```

## 3. Liste de Vérification Mensuelle @showdialog
- [ ] Nettoyer les capteurs
- [ ] Vérifier les connexions
- [ ] Calibrer les capteurs
- [ ] Mettre à jour le firmware si nécessaire
- [ ] Sauvegarder les données
- [ ] Vérifier l'usure des composants

## Résolution des Problèmes Courants @showdialog

### Table de Diagnostic Rapide

| Symptôme | Cause Possible | Solution |
|----------|----------------|----------|
| LED RGB ne s'allume pas | Connexions | Vérifier câblage et résistances |
| Lectures DHT11 invalides | Interférences | Éloigner des sources d'interférence |
| Humidité sol erratique | Calibration | Recalibrer avec sol sec/humide |
| Programme freeze | Mémoire pleine | Nettoyer mémoire et redémarrer |
| Communication USB instable | Câble/Driver | Tester autre câble/port |

### Codes d'Erreur Communs

| Code | Signification | Action |
|------|---------------|--------|
| E01 | Erreur DHT11 | Vérifier alimentation |
| E02 | Erreur Sol | Recalibrer capteur |
| E03 | Erreur LED | Vérifier connexions |
| E04 | Erreur Mémoire | Nettoyer données |
| E05 | Erreur Communication | Réinitialiser USB |