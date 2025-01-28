# Guide de Programmation MicroBit

## Vue d'ensemble @unplugged
Ce guide complet vous accompagnera dans l'apprentissage de la programmation avec MicroBit. Il est structuré en plusieurs parties progressives, chacune construisant sur les connaissances acquises précédemment.

### Prérequis Généraux 
- Un ordinateur avec accès à Internet
- Accès à l'éditeur MakeCode (makecode.microbit.org)
- Un MicroBit (pour les tests physiques)
- Aucune connaissance préalable en programmation n'est requise

### Structure du Guide 
- A. Découverte de l'interface (15-20 min)
- B. Les Variables (30-40 min)
- C. Les Conditions (45-50 min)
- D. Les Boucles (45-50 min)
- E. Les Fonctions (45-50 min)
- F. Projet Final Intégrateur (60 min)

### Méthodologie d'apprentissage 
- Chaque section commence par des objectifs clairs
- Les concepts sont introduits progressivement
- Des exercices pratiques suivent chaque nouvelle notion
- Des défis permettent de valider les acquis
- Des projets intégrateurs consolident l'apprentissage

### Conseils pour bien suivre ce guide 
1. Suivez les sections dans l'ordre
2. Testez chaque exemple fourni
3. Complétez les exercices avant de passer à la suite
4. N'hésitez pas à expérimenter
5. Sauvegardez régulièrement votre travail

## Support et Ressources @unplugged
- Forum MakeCode : [lien]
- Documentation MicroBit : [lien]
- Communauté d'entraide : [lien]

# Section A - Découverte de l'interface MakeCode @unplugged
> Cette section vous permettra de faire vos premiers pas dans l'environnement MakeCode.

## Objectifs d'apprentissage @unplugged
- Comprendre l'organisation de l'interface MakeCode
- Identifier les différentes zones de travail
- Créer et tester un premier programme simple
- Se familiariser avec les blocs de base

## Étape 1 : Accéder à l'éditeur @showdialog
1. Ouvrez votre navigateur web
2. Allez sur [makecode.microbit.org](https://makecode.microbit.org)
3. Cliquez sur "Nouveau projet"
4. Donnez un nom à votre projet (par exemple "PremierProjet")

![Interface initiale MakeCode](https://example.com/image1.png)

## Étape 2 : Découverte des zones de travail @fullscreen

L'interface se compose de plusieurs zones importantes :
1. La zone de programmation (au centre)
2. Le simulateur MicroBit (à gauche)
3. La palette des blocs (à droite)
4. La barre d'outils (en haut)

```blocks
basic.showString("Hello!")
```

## Étape 3 : Les catégories de blocs @fullscreen
Explorons les différentes catégories :
* ``||basic:Base||`` - Blocs fondamentaux
* ``||input:Entrées||`` - Gestion des boutons et capteurs
* ``||music:Musique||`` - Sons et mélodies
* ``||led:LED||`` - Contrôle de l'affichage
* ``||variables:Variables||`` - Gestion des données
* ``||logic:Logique||`` - Conditions et tests

## Exercice 1 : Premier programme @fullscreen
Créons un message défilant simple :

1. Dans ``||basic:Base||``, trouvez le bloc ``||basic:afficher texte||``
2. Glissez-le dans la zone ``||basic:au démarrage||``
3. Modifiez le texte pour écrire "Bonjour!"

```blocks
basic.showString("Bonjour!")
```

## Exercice 2 : Animation simple @fullscreen
Ajoutons une animation :

1. Dans ``||basic:Base||``, trouvez ``||basic:montrer l'icône||``
2. Placez-le après votre message
3. Choisissez une icône

```blocks
basic.showString("Bonjour!")
basic.showIcon(IconNames.Heart)
```

## Défi : Personnalisez votre accueil @fullscreen
Créez une séquence qui :
1. Affiche votre nom
2. Montre une icône
3. Affiche une autre icône

Astuce : Utilisez plusieurs blocs à la suite

```blocks
basic.showString("Claude")
basic.showIcon(IconNames.Heart)
basic.pause(100)
basic.showIcon(IconNames.Happy)
```

## Points de validation @unplugged
Vérifiez que vous savez :
- ✓ Créer un nouveau projet
- ✓ Trouver les blocs dans les catégories
- ✓ Assembler des blocs
- ✓ Tester sur le simulateur

## Pour aller plus loin @unplugged
- Explorez les différentes icônes disponibles
- Essayez d'ajouter des pauses entre les animations
- Testez différentes vitesses d'affichage du texte

---
# Section B - Les Variables
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

---
# Section C - Les Conditions
> Apprenez à prendre des décisions dans vos programmes

## Objectifs d'apprentissage @unplugged
- Comprendre la logique des conditions
- Utiliser les blocs SI/ALORS/SINON
- Maîtriser les comparaisons
- Combiner plusieurs conditions
- Créer un programme réactif

## Étape 1 : Structure SI/ALORS @fullscreen

Les conditions permettent à votre programme de prendre des décisions.
Structure de base :
```blocks
if (true) {
    basic.showIcon(IconNames.Yes)
}
```
Le code dans les accolades s'exécute uniquement si la condition est vraie.

## Étape 2 : Comparaisons simples @fullscreen

Les opérateurs de comparaison :
* ``||logic:égal à||`` (=)
* ``||logic:plus grand que||`` (>)
* ``||logic:plus petit que||`` (<)
* ``||logic:supérieur ou égal||`` (≥)
* ``||logic:inférieur ou égal||`` (≤)
* ``||logic:différent de||`` (≠)

```blocks
let x = 5
if (x > 3) {
    basic.showIcon(IconNames.Happy)
}
```

## Exercice 1 : Détecteur de luminosité @fullscreen

Créons un programme qui réagit à la lumière :

```blocks
basic.forever(function () {
    if (input.lightLevel() > 128) {
        basic.showIcon(IconNames.Sun)
    } else {
        basic.showIcon(IconNames.Moon)
    }
})
```

## Étape 3 : Structure SI/ALORS/SINON @fullscreen

Ajoutons une alternative avec SINON :

```blocks
let temperature = input.temperature()
if (temperature > 20) {
    basic.showIcon(IconNames.Hot)
} else {
    basic.showIcon(IconNames.Cold)
}
```

## Étape 4 : Conditions multiples @fullscreen

Utilisons ET (``||logic:and||``) et OU (``||logic:or||``) :

```blocks
let x = 5
if (x > 0 && x < 10) {
    basic.showIcon(IconNames.Yes)
}
```

## Mini-projet : Thermostat intelligent @fullscreen

Créons un thermostat avec plusieurs niveaux :

```blocks
basic.forever(function () {
    let temp = input.temperature()
    if (temp < 16) {
        basic.showIcon(IconNames.Sad)
        basic.showString("FROID")
    } else if (temp < 24) {
        basic.showIcon(IconNames.Happy)
        basic.showString("OK")
    } else {
        basic.showIcon(IconNames.Hot)
        basic.showString("CHAUD")
    }
    basic.pause(1000)
})
```

## Défi : Jeu de réflexes @fullscreen

Créez un jeu qui :
1. Attend un temps aléatoire
2. Affiche une cible
3. Mesure le temps de réaction du joueur
4. Affiche "RAPIDE" si < 1s, "LENT" sinon

```hint
Utilisez randint() pour le temps d'attente
```

## Points de validation @unplugged
Vérifiez que vous savez :
- ✓ Utiliser une condition simple
- ✓ Ajouter une alternative (SINON)
- ✓ Combiner des conditions
- ✓ Utiliser les capteurs dans les conditions
- ✓ Créer des programmes interactifs

## Exercices pratiques @unplugged

1. Créez un détecteur d'inclinaison (utiliser ``||input:acceleration||``)
2. Faites un programme qui compte les appuis rapides/lents
3. Créez un système de score avec différents niveaux

## Conseils de débogage @unplugged
- Testez vos conditions avec des valeurs limites
- Vérifiez que toutes les situations sont gérées
- Utilisez des ``||basic:show number||`` pour déboguer
- Attention aux conditions qui ne sont jamais vraies/fausses

## Pour aller plus loin @unplugged
- Explorez les autres capteurs du MicroBit
- Combinez plusieurs conditions complexes
- Créez des jeux basés sur les conditions
- Utilisez des variables pour stocker des états

---
# Section D - Les Boucles
> Découvrez comment répéter des actions automatiquement

## Objectifs d'apprentissage @unplugged
- Comprendre les différents types de boucles
- Utiliser la boucle ``||loops:répéter||``
- Maîtriser la boucle ``||basic:toujours||``
- Créer des animations
- Optimiser son code avec les boucles

## Étape 1 : La boucle "répéter" @fullscreen

Une boucle permet de répéter des actions plusieurs fois.
Structure de base :

```blocks
for (let index = 0; index < 4; index++) {
    basic.showIcon(IconNames.Heart)
    basic.pause(100)
    basic.clearScreen()
    basic.pause(100)
}
```

## Étape 2 : La boucle "toujours" @fullscreen

Pour répéter indéfiniment une action :

```blocks
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(500)
})
```

## Exercice 1 : Animation simple @fullscreen

Créons une animation de cœur battant :

```blocks
basic.forever(function () {
    for (let i = 0; i < 5; i++) {
        led.plotBrightness(2, 2, 255)
        basic.pause(200)
        led.plotBrightness(2, 2, 50)
        basic.pause(200)
    }
    basic.clearScreen()
    basic.pause(1000)
})
```

## Étape 3 : Boucles avec compteur @fullscreen

Utilisons une variable pour compter :

```blocks
let compteur = 0
basic.forever(function () {
    for (let index = 0; index <= 4; index++) {
        led.plot(index, 0)
        basic.pause(200)
    }
    basic.clearScreen()
})
```

## Mini-projet : Chenillard LED @fullscreen

Créons un effet de lumière défilante :

```blocks
basic.forever(function () {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.plot(x, y)
            basic.pause(100)
            led.unplot(x, y)
        }
    }
})
```

## Défi : Animation personnalisée @fullscreen

Créez une animation qui :
1. Dessine un carré grandissant
2. Le fait clignoter 3 fois
3. Le fait disparaître progressivement

```hint
Utilisez des boucles imbriquées pour les côtés du carré
```

## Exercice avancé : Spirale @fullscreen

```blocks
let x = 2
let y = 2
basic.forever(function () {
    for (let i = 1; i <= 4; i++) {
        for (let j = 0; j < i; j++) {
            led.plot(x, y)
            if (i == 1) {
                x += 1
            } else if (i == 2) {
                y += 1
            } else if (i == 3) {
                x -= 1
            } else {
                y -= 1
            }
            basic.pause(200)
        }
    }
    basic.clearScreen()
})
```

## Points de validation @unplugged
Vérifiez que vous savez :
- ✓ Utiliser une boucle répéter
- ✓ Utiliser une boucle toujours
- ✓ Créer des animations
- ✓ Utiliser des boucles imbriquées
- ✓ Contrôler le timing des animations

## Astuces d'optimisation @unplugged
- Évitez les pauses trop longues dans les boucles
- Utilisez des variables pour contrôler la vitesse
- Pensez à effacer l'écran quand nécessaire
- Combinez les boucles avec des conditions

## Exercices pratiques @unplugged

1. Créez une barre de chargement
2. Faites une animation de pluie
3. Créez un motif en damier alternant

## Dépannage @unplugged
- Si votre animation est trop rapide, augmentez les pauses
- Si votre boucle semble infinie, vérifiez les conditions de sortie
- Utilisez des LED individuelles pour déboguer
- Attention à la consommation de ressources

## Pour aller plus loin @unplugged
- Créez des animations complexes
- Combinez plusieurs effets
- Ajoutez de l'interactivité
- Expérimentez avec la luminosité

---
# Section E - Les Fonctions
> Apprenez à organiser votre code et à créer des blocs réutilisables

## Objectifs d'apprentissage @unplugged
- Comprendre le concept de fonction
- Créer et appeler des fonctions
- Utiliser des paramètres
- Retourner des valeurs
- Organiser son code efficacement

## Étape 1 : Qu'est-ce qu'une fonction ? @fullscreen

Une fonction est comme une recette : elle contient une série d'instructions qu'on peut réutiliser.
Pour créer une fonction :
1. Cliquez sur "Avancé"
2. Sélectionnez "Fonctions"
3. Cliquez sur "Créer une fonction"

```blocks
function afficherSmiley() {
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
    basic.clearScreen()
}

basic.forever(function() {
    afficherSmiley()
})
```

## Étape 2 : Fonctions avec paramètres @fullscreen

Ajoutons des paramètres pour rendre nos fonctions plus flexibles :

```blocks
function afficherNFois(n: number) {
    for (let index = 0; index < n; index++) {
        basic.showIcon(IconNames.Heart)
        basic.pause(200)
        basic.clearScreen()
        basic.pause(200)
    }
}

input.onButtonPressed(Button.A, function() {
    afficherNFois(3)
})
```

## Exercice 1 : Fonction de dessin @fullscreen

Créons une fonction qui dessine un motif :

```blocks
function dessinerCarre(taille: number) {
    for (let i = 0; i < taille; i++) {
        for (let j = 0; j < taille; j++) {
            led.plot(i, j)
            basic.pause(100)
        }
    }
}

input.onButtonPressed(Button.A, function() {
    dessinerCarre(3)
})
```

## Étape 3 : Fonctions avec retour @fullscreen

Créons une fonction qui calcule et retourne une valeur :

```blocks
function calculerScore(temps: number, bonus: number): number {
    return temps * 10 + bonus
}

let score = calculerScore(5, 20)
basic.showNumber(score)
```

## Mini-projet : Convertisseur de température @fullscreen

```blocks
function celsiusVersfahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32
}

function afficherTemperature() {
    let tempC = input.temperature()
    let tempF = celsiusVersfahrenheit(tempC)
    basic.showString("C:")
    basic.showNumber(tempC)
    basic.pause(1000)
    basic.showString("F:")
    basic.showNumber(tempF)
}

basic.forever(function() {
    if (input.buttonIsPressed(Button.A)) {
        afficherTemperature()
    }
})
```

## Défi : Système de jeu complet @fullscreen

Créez un jeu avec :
1. Une fonction pour initialiser le jeu
2. Une fonction pour gérer le score
3. Une fonction pour l'animation de victoire
4. Une fonction pour vérifier le niveau

```hint
Utilisez des variables globales pour le score et le niveau
```

## Points de validation @unplugged
Vérifiez que vous savez :
- ✓ Créer une fonction simple
- ✓ Ajouter des paramètres
- ✓ Retourner des valeurs
- ✓ Appeler des fonctions
- ✓ Organiser votre code

## Bonnes pratiques @unplugged
- Donnez des noms clairs à vos fonctions
- Une fonction = une tâche précise
- Limitez le nombre de paramètres
- Commentez vos fonctions complexes
- Testez chaque fonction séparément

## Exercices pratiques @unplugged

1. Créez une fonction de compte à rebours
2. Faites une fonction d'animation personnalisée
3. Créez une fonction de calcul de moyenne

## Astuces de débogage @unplugged
- Testez vos fonctions avec différents paramètres
- Vérifiez les valeurs retournées
- Utilisez des affichages temporaires pour déboguer
- Décomposez les problèmes complexes

## Pour aller plus loin @unplugged
- Créez des bibliothèques de fonctions
- Combinez plusieurs fonctions
- Utilisez des fonctions récursives
- Optimisez vos fonctions

---
# Section F - Projet Final Intégrateur
> Créez un jeu complet en utilisant tous les concepts appris

## Objectifs d'apprentissage @unplugged
- Combiner tous les concepts vus précédemment
- Créer un jeu interactif complet
- Gérer un système de score
- Implémenter différents niveaux
- Utiliser des animations

## Le Projet : "Attrape-Pixel" @fullscreen

Nous allons créer un jeu où le joueur doit attraper des pixels qui apparaissent aléatoirement sur l'écran.

## Étape 1 : Variables globales @fullscreen

Commençons par définir nos variables :

```blocks
let score = 0
let niveau = 1
let vitesseJeu = 1000
let pixelX = 0
let pixelY = 0
let gameOn = false

function initialiserJeu() {
    score = 0
    niveau = 1
    vitesseJeu = 1000
    gameOn = true
    basic.showNumber(3)
    basic.pause(1000)
    basic.showNumber(2)
    basic.pause(1000)
    basic.showNumber(1)
    basic.pause(1000)
}
```

## Étape 2 : Génération des pixels @fullscreen

Créons une fonction pour placer les pixels :

```blocks
function nouveauPixel() {
    basic.clearScreen()
    pixelX = randint(0, 4)
    pixelY = randint(0, 4)
    led.plot(pixelX, pixelY)
}

function verifierCapture(x: number, y: number): boolean {
    return (x == pixelX && y == pixelY)
}
```

## Étape 3 : Gestion du score @fullscreen

```blocks
function augmenterScore() {
    score += 1
    if (score % 5 == 0) {
        niveau += 1
        vitesseJeu = Math.max(vitesseJeu - 100, 200)
        afficherNiveauUp()
    }
}

function afficherNiveauUp() {
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    basic.showNumber(niveau)
    basic.pause(500)
}
```

## Étape 4 : Contrôle du jeu @fullscreen

Utilisons les boutons pour jouer :

```blocks
input.onButtonPressed(Button.A, function() {
    if (gameOn) {
        if (verifierCapture(pixelX, pixelY)) {
            augmenterScore()
            music.playTone(Note.C5, music.beat(BeatFraction.Sixteenth))
        } else {
            terminerJeu()
        }
    }
})

input.onButtonPressed(Button.B, function() {
    if (!gameOn) {
        initialiserJeu()
    }
})
```

## Étape 5 : Boucle principale @fullscreen

```blocks
basic.forever(function() {
    if (gameOn) {
        nouveauPixel()
        basic.pause(vitesseJeu)
    }
})

function terminerJeu() {
    gameOn = false
    basic.showIcon(IconNames.Sad)
    basic.pause(1000)
    basic.showString("Score:")
    basic.showNumber(score)
}
```

## Défi : Améliorations @fullscreen

Ajoutez ces fonctionnalités :
1. Mode deux joueurs
2. Sons différents selon le niveau
3. Bonus spéciaux clignotants
4. Tableau des meilleurs scores

```hint
Utilisez des tableaux pour sauvegarder les scores
```

## Points de validation @unplugged
Vérifiez que votre jeu inclut :
- ✓ Un système de score fonctionnel
- ✓ Plusieurs niveaux de difficulté
- ✓ Des animations et retours visuels
- ✓ Une gestion des erreurs
- ✓ Un système de redémarrage

## Guide de test @unplugged
1. Testez le démarrage du jeu
2. Vérifiez la progression des niveaux
3. Testez les conditions de fin
4. Vérifiez le système de score
5. Testez les cas limites

## Pour aller plus loin @unplugged
- Ajoutez des effets sonores
- Créez différents modes de jeu
- Implémentez un système de vies
- Ajoutez des obstacles mobiles

## Ressources complémentaires @unplugged
- Documentation MakeCode
- Exemples de jeux similaires
- Tutoriels d'optimisation
- Forums communautaires

---