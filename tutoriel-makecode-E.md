# Les Fonctions

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
