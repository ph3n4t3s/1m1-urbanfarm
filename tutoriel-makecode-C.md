# Les Conditions

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