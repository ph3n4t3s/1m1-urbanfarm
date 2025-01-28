
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
 * UrbanFarm blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace urbanfarm {
    /**
     * TODO: La fonction log permet d'envoyer des données sur l'ordinateur
     * @param s représente la chaîne de caractère à envoyer
     * @param e describe parameter here
     */
    //% block
    export function log(s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: Fonction d'initialisation du système
     */
    //% block
    export function init(): void {
        //
    }
}
