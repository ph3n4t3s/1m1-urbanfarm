# Diagnostic Initial

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
