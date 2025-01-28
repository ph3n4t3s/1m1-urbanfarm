# Tutoriel LED RGB : Éclairage Intelligent pour Micro-Serre

## Introduction

La lumière est essentielle pour la croissance des plantes. Une LED RGB nous permet de créer un éclairage intelligent qui s'adapte aux différentes phases de croissance des plantes. Dans ce tutoriel, nous apprendrons à contrôler précisément la couleur et l'intensité de la lumière.

## Comprendre la LED RGB

### Qu'est-ce qu'une LED RGB ?
Une LED RGB combine trois LED en une :
- **R**ouge : favorise la floraison et la fructification
- **V**ert (*Green*) : correspond à la lumière réfléchie par les plantes
- **B**leu : stimule la croissance végétative

### Spectre Lumineux et Plantes
Les plantes utilisent différentes couleurs pour différents aspects de leur croissance :
- Rouge (620-750 nm) : photosynthèse et floraison
- Bleu (450-495 nm) : croissance des feuilles
- Vert (495-570 nm) : peu utilisé, majoritairement réfléchi

## Étape 1 : Installation du Matériel

### Composants Nécessaires
- 1 MicroBit V2
- 1 LED RGB à anode commune
- 4 câbles de connexion
- 1 câble micro-USB
- Résistances de 220Ω (optionnelles mais recommandées)

### Schéma de Connexion
```
MicroBit    ->    LED RGB
GND         ->    GND
P0          ->    Rouge (via résistance 220Ω)
P1          ->    Vert  (via résistance 220Ω)
P2          ->    Bleu  (via résistance 220Ω)
```

## Étape 2 : Premier Programme en Blocs

Commençons par un test simple des couleurs :

```blocks
input.onButtonPressed(Button.A, function() {
    // Rouge pur
    pins.analogWritePin(AnalogPin.P0, 1023)
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
})

input.onButtonPressed(Button.B, function() {
    // Bleu pur
    pins.analogWritePin(AnalogPin.P0, 0)
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.analogWritePin(AnalogPin.P2, 1023)
})

input.onButtonPressed(Button.AB, function() {
    // Blanc (toutes les couleurs)
    pins.analogWritePin(AnalogPin.P0, 1023)
    pins.analogWritePin(AnalogPin.P1, 1023)
    pins.analogWritePin(AnalogPin.P2, 1023)
})
```

## Étape 3 : Création de Spectres Personnalisés

### Programme de Mélange de Couleurs

```blocks
// Variables pour les intensités
let rouge = 0
let vert = 0
let bleu = 0
let intensite_globale = 1023

function definirCouleur(r: number, g: number, b: number) {
    // Ajustement avec l'intensité globale
    let r_ajuste = Math.round((r * intensite_globale) / 1023)
    let g_ajuste = Math.round((g * intensite_globale) / 1023)
    let b_ajuste = Math.round((b * intensite_globale) / 1023)
    
    // Application des valeurs
    pins.analogWritePin(AnalogPin.P0, r_ajuste)
    pins.analogWritePin(AnalogPin.P1, g_ajuste)
    pins.analogWritePin(AnalogPin.P2, b_ajuste)
}

// Presets pour différentes phases de croissance
function lumiereCroissance() {
    // Dominance bleue pour la croissance végétative
    definirCouleur(400, 800, 1023)
}

function lumiereFloraison() {
    // Dominance rouge pour la floraison
    definirCouleur(1023, 400, 400)
}

function lumiereRepos() {
    // Faible intensité équilibrée
    intensite_globale = 200
    definirCouleur(1023, 1023, 1023)
}
```

## Étape 4 : Cycle Journalier Automatique

Créons un cycle jour/nuit naturel :

```python
from microbit import *
import math

class ControleurLumiere:
    def __init__(self):
        self.pins = {"r": pin0, "g": pin1, "b": pin2}
        self.intensite = 1023
        self.cycle_jour = True
    
    def definir_couleur(self, r, g, b):
        """
        Définit les couleurs avec l'intensité actuelle
        Valeurs de 0 à 1023 pour chaque composante
        """
        facteur = self.intensite / 1023
        self.pins["r"].write_analog(int(r * facteur))
        self.pins["g"].write_analog(int(g * facteur))
        self.pins["b"].write_analog(int(b * facteur))
    
    def lever_soleil(self):
        """Simule un lever de soleil progressif"""
        for i in range(0, 1024, 10):
            self.intensite = i
            # Couleur chaude du matin
            self.definir_couleur(1023, 850, 400)
            sleep(100)
    
    def coucher_soleil(self):
        """Simule un coucher de soleil progressif"""
        for i in range(1023, -1, -10):
            self.intensite = i
            # Couleur chaude du soir
            self.definir_couleur(1023, 850, 400)
            sleep(100)
    
    def cycle_journalier(self):
        """Gère un cycle complet jour/nuit"""
        while True:
            # Lever du soleil
            self.lever_soleil()
            
            # Journée (12 heures)
            for _ in range(720):  # 12 heures * 60 minutes
                self.definir_couleur(1023, 1023, 1023)
                sleep(1000)  # Attente d'une minute
            
            # Coucher du soleil
            self.coucher_soleil()
            
            # Nuit (12 heures)
            self.definir_couleur(0, 0, 0)
            sleep(43200000)  # 12 heures en millisecondes

```

## Étape 5 : Adaptation aux Conditions

Intégrons les données du DHT11 pour adapter l'éclairage :

```python
def adapter_lumiere(temperature):
    """Adapte la lumière selon la température"""
    if temperature > 30:
        # Réduction de l'intensité si trop chaud
        return {"r": 400, "g": 400, "b": 1023}
    elif temperature < 20:
        # Plus de rouge si trop froid
        return {"r": 1023, "g": 400, "b": 400}
    else:
        # Conditions optimales
        return {"r": 800, "g": 800, "b": 800}
```

## Exercices Pratiques

### Exercice 1 : Création de Couleurs
1. Créez différentes combinaisons RGB
2. Observez les mélanges de couleurs
3. Mesurez l'intensité lumineuse

### Exercice 2 : Transitions Douces
1. Programmez une transition progressive
2. Créez un effet arc-en-ciel
3. Simulez les variations naturelles

### Exercice 3 : Optimisation Énergétique
1. Mesurez la consommation
2. Optimisez les cycles
3. Créez un mode économique

## Projets Créatifs

### 1. Spectre Personnalisé
Créez un programme qui :
- Analyse les besoins de votre plante
- Crée un spectre lumineux adapté
- Permet des ajustements faciles

### 2. Simulation Naturelle
Développez un système qui :
- Simule la course du soleil
- Varie les couleurs naturellement
- S'adapte aux saisons

### 3. Contrôle Intelligent
Intégrez :
- Détection de luminosité ambiante
- Adaptation à la température
- Modes prédéfinis pour différentes plantes

## Dépannage

### Problèmes Courants

1. **LED ne s'allume pas**
   - Vérifiez les connexions
   - Contrôlez les résistances
   - Testez chaque couleur séparément

2. **Couleurs incorrectes**
   - Vérifiez l'ordre des broches
   - Contrôlez les valeurs PWM
   - Testez les composantes individuellement

3. **Scintillement**
   - Réduisez la fréquence des mises à jour
   - Vérifiez l'alimentation
   - Utilisez des condensateurs de découplage

## Optimisations Avancées

### 1. Gestion de la Chaleur
- Surveillance de la température
- Ajustement automatique de l'intensité
- Cycles de refroidissement

### 2. Efficacité Énergétique
- Calcul de la consommation
- Optimisation des cycles
- Modes économiques

### 3. Durabilité
- Rotation des LED
- Gestion de la durée de vie
- Maintenance préventive

## Conclusion

Ce tutoriel vous a permis de :
- Comprendre le contrôle RGB
- Créer des spectres lumineux adaptés
- Automatiser l'éclairage
- Optimiser la consommation

## Ressources Supplémentaires
- [Guide des Spectres Lumineux](lien)
- [Calculateur de Résistances](lien)
- [Forum Micro-Serre](lien)

