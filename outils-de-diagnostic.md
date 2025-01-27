# Outils de Diagnostic

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
