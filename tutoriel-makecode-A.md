# Découverte de l'interface MakeCode

> Cette section vous permettra de faire vos premiers pas dans l'environnement MakeCode.

## Objectifs d'apprentissage @showdialog

- Comprendre l'organisation de l'interface MakeCode
- Identifier les différentes zones de travail
- Créer et tester un premier programme simple
- Se familiariser avec les blocs de base

## Étape 1 : Accéder à l'éditeur

1. Ouvrez votre navigateur web
2. Allez sur [makecode.microbit.org](https://makecode.microbit.org)
3. Cliquez sur "Nouveau projet"
4. Donnez un nom à votre projet (par exemple "PremierProjet")

![Interface initiale MakeCode](https://example.com/image1.png)

## Étape 2 : Découverte des zones de travail

L'interface se compose de plusieurs zones importantes :

1. La zone de programmation (au centre)
2. Le simulateur MicroBit (à gauche)
3. La palette des blocs (à droite)
4. La barre d'outils (en haut)

```blocks
basic.showString("Hello!")
```

## Étape 3 : Les catégories de blocs 

Explorons les différentes catégories :

* ``||basic:Base||`` - Blocs fondamentaux
* ``||input:Entrées||`` - Gestion des boutons et capteurs
* ``||music:Musique||`` - Sons et mélodies
* ``||led:LED||`` - Contrôle de l'affichage
* ``||variables:Variables||`` - Gestion des données
* ``||logic:Logique||`` - Conditions et tests

## Exercice 1 : Premier programme @showdialog

Créons un message défilant simple :

1. Dans ``||basic:Base||``, trouvez le bloc ``||basic:afficher texte||``
2. Glissez-le dans la zone ``||basic:au démarrage||``
3. Modifiez le texte pour écrire "Bonjour!"

```blocks
basic.showString("Bonjour!")
```

## Exercice 2 : Animation simple @showdialog

Ajoutons une animation :

1. Dans ``||basic:Base||``, trouvez ``||basic:montrer l'icône||``
2. Placez-le après votre message
3. Choisissez une icône

```blocks
basic.showString("Bonjour!")
basic.showIcon(IconNames.Heart)
```

## Défi : Personnalisez votre accueil @showdialog

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

## Points de validation @showdialog

Vérifiez que vous savez :

- ✓ Créer un nouveau projet
- ✓ Trouver les blocs dans les catégories
- ✓ Assembler des blocs
- ✓ Tester sur le simulateur

## Pour aller plus loin @showdialog

- Explorez les différentes icônes disponibles
- Essayez d'ajouter des pauses entre les animations
- Testez différentes vitesses d'affichage du texte