# Les Boucles

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