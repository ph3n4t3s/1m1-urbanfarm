# Problèmes Logiciels

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

