# Les Variables

> Découvrez comment stocker et manipuler des données dans vos programmes.

## Objectifs d'apprentissage @unplugged

- Comprendre le concept de variable
- Créer et manipuler différents types de variables
- Utiliser les variables pour compter et stocker des informations
- Créer un compteur interactif

## Étape 1 : Qu'est-ce qu'une variable ? @fullscreen

Les variables sont comme des boîtes qui permettent de stocker des informations.
Types de variables :

* Nombres (ex: score, âge)
* Textes (ex: nom, message)
* Booléens (vrai/faux)

## Étape 2 : Créer une variable @fullscreen

1. Cliquez sur ``||variables:Variables||``
2. Cliquez sur "Créer une variable"
3. Nommez-la "compteur"

![Création variable](https://example.com/create-variable.png)

```blocks
let compteur = 0
```

## Étape 3 : Initialiser une variable @fullscreen

Définissons une valeur de départ :

1. Utilisez le bloc ``||variables:définir compteur||``
2. Placez-le dans ``||basic:au démarrage||``
3. Définissez la valeur à 0

```blocks
let compteur = 0
basic.showNumber(compteur)
```

## Exercice 1 : Compteur simple @fullscreen

Créons un compteur qui s'incrémente avec le bouton A :

```blocks
let compteur = 0
input.onButtonPressed(Button.A, function () {
    compteur += 1
    basic.showNumber(compteur)
})
```

## Étape 4 : Manipuler les variables @fullscreen

Opérations possibles :

* Addition : ``||math:+||``
* Soustraction : ``||math:-||``
* Multiplication : ``||math:×||``
* Division : ``||math:÷||``

```blocks
let compteur = 0
input.onButtonPressed(Button.A, function () {
    compteur += 1
    basic.showNumber(compteur)
})
input.onButtonPressed(Button.B, function () {
    compteur -= 1
    basic.showNumber(compteur)
})
```

## Mini-projet : Compteur avancé @fullscreen

Créons un compteur avec les fonctionnalités suivantes :

* Bouton A : +1
* Bouton B : -1
* A+B ensemble : remise à zéro

```blocks
let compteur = 0
basic.showNumber(compteur)

input.onButtonPressed(Button.A, function () {
    compteur += 1
    basic.showNumber(compteur)
})
input.onButtonPressed(Button.B, function () {
    compteur -= 1
    basic.showNumber(compteur)
})
input.onButtonPressed(Button.AB, function () {
    compteur = 0
    basic.showNumber(compteur)
})
```

## Défi : Score de jeu @fullscreen

Créez un système de score qui :

1. Commence à 10 points
2. Gagne 2 points avec A
3. Perd 1 point avec B
4. Affiche une icône spéciale à 20 points

```hint
Utilisez une condition pour vérifier le score
```

## Points de validation @unplugged

Vérifiez que vous savez :

- ✓ Créer une variable
- ✓ Modifier sa valeur
- ✓ Afficher sa valeur
- ✓ Utiliser les opérations mathématiques
- ✓ Réinitialiser une variable

## Exercices pratiques @unplugged

1. Créez un compteur qui compte de 2 en 2
2. Faites un multiplicateur (×2 avec A, ÷2 avec B)
3. Créez une variable texte qui alterne entre "JOUR" et "NUIT"

## Astuce de débogage @unplugged

- Utilisez ``||basic:montrer nombre||`` pour vérifier la valeur de vos variables
- Vérifiez que vos variables sont bien initialisées au démarrage
- Attention aux valeurs négatives si non souhaitées
