# Création d'une Micro-Serre avec MicroBit

## Introduction

Bienvenue dans ce tutoriel qui vous guidera dans la création d'une micro-serre intelligente avec MicroBit ! Ce projet passionnant vous permettra d'apprendre la programmation tout en créant quelque chose d'utile et d'écologique.

## Objectifs d'Apprentissage

À la fin de ce tutoriel, vous serez capable de :
- Programmer un MicroBit en mode blocs et Python
- Utiliser des capteurs pour mesurer des conditions environnementales
- Créer des systèmes de contrôle automatisés
- Collecter et analyser des données

## Prérequis

Pour suivre ce tutoriel, vous aurez besoin de :
1. Un ordinateur avec accès à Internet
2. Un MicroBit V2
3. Les composants suivants :
   - Un capteur M5Stack EARTH
   - Un capteur DHT11
   - Une LED RGB
   - Des câbles de connexion
   - Un câble micro-USB

## Structure du Tutoriel

Le tutoriel est divisé en trois parties progressives :

### 1. Mesure de l'Humidité du Sol
- Installation du M5Stack EARTH
- Lecture des données
- Calibration du capteur
- Création d'alertes

### 2. Surveillance de l'Environnement
- Installation du DHT11
- Mesure de température et d'humidité
- Gestion des erreurs
- Enregistrement des données

### 3. Contrôle de l'Éclairage
- Installation de la LED RGB
- Création de cycles lumineux
- Adaptation aux conditions
- Optimisation énergétique

## Comment Utiliser ce Tutoriel

1. **Progression** : Suivez les parties dans l'ordre
2. **Pratique** : Réalisez tous les exercices proposés
3. **Expérimentation** : N'hésitez pas à modifier les programmes
4. **Documentation** : Prenez des notes sur vos observations

## Préparation de l'Environnement MakeCode

1. Ouvrez votre navigateur et allez sur [makecode.microbit.org](https://makecode.microbit.org/)
2. Cliquez sur "Nouveau Projet"
3. Familiarisez-vous avec l'interface :
   - Simulateur (gauche)
   - Zone de programmation (centre)
   - Palette de blocs (droite)

## Conseils pour Réussir

1. **Patience** : Prenez votre temps pour comprendre chaque concept
2. **Tests** : Vérifiez régulièrement votre code avec le simulateur
3. **Erreurs** : Les erreurs sont normales et font partie de l'apprentissage
4. **Questions** : N'hésitez pas à demander de l'aide

## Commençons !

Choisissez la partie qui vous intéresse :
- [Tutoriel M5Stack EARTH](tutoriel-m5stack.md)
- [Tutoriel DHT11](tutoriel-dht11.md)
- [Tutoriel LED RGB](tutoriel-led-rgb.md)

Bon apprentissage ! 🌱🤖

/**
* Utilisez ce fichier pour définir des fonctions et des blocs personnalisés.
* En savoir plus à https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
