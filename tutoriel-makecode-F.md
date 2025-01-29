# Projet Final

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