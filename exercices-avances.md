# Exercices Pratiques Avancés pour Micro-Serre

## Série 1 : Gestion Avancée des Données

### Exercice 1.1 : Journal Environnemental
Créez un système de journalisation complet qui enregistre l'historique des conditions.

```python
class JournalEnvironnemental:
    def __init__(self):
        self.donnees = []
        self.interval_enregistrement = 900000  # 15 minutes en ms
        self.dernier_enregistrement = 0
    
    def ajouter_mesure(self, temperature, humidite_air, humidite_sol):
        temps_actuel = running_time()
        if temps_actuel - self.dernier_enregistrement >= self.interval_enregistrement:
            mesure = {
                'timestamp': temps_actuel,
                'temperature': temperature,
                'humidite_air': humidite_air,
                'humidite_sol': humidite_sol
            }
            self.donnees.append(mesure)
            self.dernier_enregistrement = temps_actuel
            
            # Envoi via série
            print(f"LOG,{temps_actuel},{temperature},{humidite_air},{humidite_sol}")
    
    def analyser_tendances(self):
        if len(self.donnees) < 2:
            return "Pas assez de données"
            
        derniere = self.donnees[-1]
        avant_derniere = self.donnees[-2]
        
        variations = {
            'temperature': derniere['temperature'] - avant_derniere['temperature'],
            'humidite_air': derniere['humidite_air'] - avant_derniere['humidite_air'],
            'humidite_sol': derniere['humidite_sol'] - avant_derniere['humidite_sol']
        }
        
        return variations

# Utilisation
journal = JournalEnvironnemental()

# Dans la boucle principale
while True:
    temp = dht11.temperature()
    hum_air = dht11.humidity()
    hum_sol = pin1.read_analog()
    
    journal.ajouter_mesure(temp, hum_air, hum_sol)
    tendances = journal.analyser_tendances()
    
    # Affichage des tendances
    if tendances != "Pas assez de données":
        if abs(tendances['temperature']) > 2:
            display.show("T")
        if abs(tendances['humidite_sol']) > 5:
            display.show("H")
    
    sleep(1000)
```

### Exercice 1.2 : Calcul de Moyennes Mobiles
Implémentez un système de calcul de moyennes mobiles pour lisser les mesures.

```python
class MoyennesMobiles:
    def __init__(self, taille_fenetre=5):
        self.taille_fenetre = taille_fenetre
        self.valeurs = {
            'temperature': [],
            'humidite_air': [],
            'humidite_sol': []
        }
    
    def ajouter_valeur(self, type_mesure, valeur):
        if type_mesure in self.valeurs:
            self.valeurs[type_mesure].append(valeur)
            if len(self.valeurs[type_mesure]) > self.taille_fenetre:
                self.valeurs[type_mesure].pop(0)
    
    def obtenir_moyenne(self, type_mesure):
        if type_mesure in self.valeurs and self.valeurs[type_mesure]:
            return sum(self.valeurs[type_mesure]) / len(self.valeurs[type_mesure])
        return None

# Utilisation
moyennes = MoyennesMobiles()

# Dans la boucle principale
while True:
    temp = dht11.temperature()
    moyennes.ajouter_valeur('temperature', temp)
    temp_moyenne = moyennes.obtenir_moyenne('temperature')
    
    if temp_moyenne is not None:
        print(f"Température moyenne: {temp_moyenne:.1f}°C")
    
    sleep(1000)
```

### Exercice 1.3 : Détection d'Anomalies
Créez un système qui détecte les variations anormales dans les mesures.

```python
class DetecteurAnomalies:
    def __init__(self):
        self.seuils = {
            'temperature': {'variation_max': 2.0, 'delai_ms': 60000},
            'humidite_air': {'variation_max': 5.0, 'delai_ms': 60000},
            'humidite_sol': {'variation_max': 10.0, 'delai_ms': 60000}
        }
        self.dernieres_mesures = {}
        self.derniers_temps = {}
    
    def detecter_anomalie(self, type_mesure, valeur):
        temps_actuel = running_time()
        
        if type_mesure not in self.dernieres_mesures:
            self.dernieres_mesures[type_mesure] = valeur
            self.derniers_temps[type_mesure] = temps_actuel
            return False
        
        delai = temps_actuel - self.derniers_temps[type_mesure]
        if delai < self.seuils[type_mesure]['delai_ms']:
            variation = abs(valeur - self.dernieres_mesures[type_mesure])
            if variation > self.seuils[type_mesure]['variation_max']:
                return True
        
        self.dernieres_mesures[type_mesure] = valeur
        self.derniers_temps[type_mesure] = temps_actuel
        return False

# Utilisation
detecteur = DetecteurAnomalies()

# Dans la boucle principale
while True:
    temp = dht11.temperature()
    if detecteur.detecter_anomalie('temperature', temp):
        display.show("!")
        music.play(music.POWER_UP)
    
    sleep(1000)
```

## Série 2 : Interface Utilisateur Avancée

### Exercice 2.1 : Menu de Configuration
Créez un menu interactif pour configurer les paramètres du système.

```python
class MenuConfiguration:
    def __init__(self):
        self.options = [
            {'nom': 'Temp Min', 'valeur': 18, 'min': 15, 'max': 25},
            {'nom': 'Temp Max', 'valeur': 30, 'min': 25, 'max': 35},
            {'nom': 'Hum Sol', 'valeur': 30, 'min': 20, 'max': 50}
        ]
        self.option_actuelle = 0
    
    def afficher_option(self):
        option = self.options[self.option_actuelle]
        display.scroll(f"{option['nom']}:{option['valeur']}")
    
    def modifier_valeur(self, augmenter=True):
        option = self.options[self.option_actuelle]
        if augmenter and option['valeur'] < option['max']:
            option['valeur'] += 1
        elif not augmenter and option['valeur'] > option['min']:
            option['valeur'] -= 1
        self.afficher_option()
    
    def option_suivante(self):
        self.option_actuelle = (self.option_actuelle + 1) % len(self.options)
        self.afficher_option()

# Configuration des boutons
menu = MenuConfiguration()

def on_button_a():
    menu.modifier_valeur(True)  # Augmenter

def on_button_b():
    menu.modifier_valeur(False)  # Diminuer

def on_button_ab():
    menu.option_suivante()

# Association des boutons
button_a.on_pressed = on_button_a
button_b.on_pressed = on_button_b
button_a+b.on_pressed = on_button_ab
```

### Exercice 2.2 : Affichage d'Informations Cyclique
Créez un système d'affichage qui alterne entre différentes informations.

```python
class AffichageAlterne:
    def __init__(self):
        self.donnees = {}
        self.mode_affichage = 0
        self.duree_affichage = 2000  # 2 secondes
        self.dernier_changement = 0
    
    def mettre_a_jour_donnees(self, temperature, humidite_air, humidite_sol):
        self.donnees = {
            'temp': temperature,
            'hum_air': humidite_air,
            'hum_sol': humidite_sol
        }
    
    def afficher(self):
        temps_actuel = running_time()
        if temps_actuel - self.dernier_changement >= self.duree_affichage:
            self.mode_affichage = (self.mode_affichage + 1) % 3
            self.dernier_changement = temps_actuel
        
        if self.mode_affichage == 0:
            display.scroll(f"T{self.donnees.get('temp', 0)}")
        elif self.mode_affichage == 1:
            display.scroll(f"A{self.donnees.get('hum_air', 0)}")
        else:
            display.scroll(f"S{self.donnees.get('hum_sol', 0)}")

# Utilisation
affichage = AffichageAlterne()

# Dans la boucle principale
while True:
    temp = dht11.temperature()
    hum_air = dht11.humidity()
    hum_sol = pin1.read_analog()
    
    affichage.mettre_a_jour_donnees(temp, hum_air, hum_sol)
    affichage.afficher()
    
    sleep(100)
```

## Série 3 : Contrôle Environnemental Avancé

### Exercice 3.1 : Gestion des Cycles de Croissance
Implémentez différents cycles de croissance pour différentes phases de développement.

```python
class GestionnaireCroissance:
    def __init__(self):
        self.phases = {
            'germination': {
                'temp_ideale': 25,
                'hum_sol_ideale': 80,
                'lumiere': {'r': 400, 'g': 400, 'b': 1023},
                'duree_heures': 72
            },
            'croissance': {
                'temp_ideale': 23,
                'hum_sol_ideale': 60,
                'lumiere': {'r': 1023, 'g': 1023, 'b': 1023},
                'duree_heures': 360
            },
            'floraison': {
                'temp_ideale': 22,
                'hum_sol_ideale': 40,
                'lumiere': {'r': 1023, 'g': 400, 'b': 400},
                'duree_heures': 240
            }
        }
        self.phase_actuelle = 'germination'
        self.temps_debut_phase = running_time()
    
    def verifier_progression(self):
        temps_ecoule = (running_time() - self.temps_debut_phase) / 3600000  # Conversion en heures
        phase = self.phases[self.phase_actuelle]
        
        if temps_ecoule >= phase['duree_heures']:
            if self.phase_actuelle == 'germination':
                self.phase_actuelle = 'croissance'
            elif self.phase_actuelle == 'croissance':
                self.phase_actuelle = 'floraison'
            
            self.temps_debut_phase = running_time()
            return True
        return False
    
    def obtenir_parametres_actuels(self):
        return self.phases[self.phase_actuelle]

# Utilisation
gestionnaire = GestionnaireCroissance()

# Dans la boucle principale
while True:
    if gestionnaire.verifier_progression():
        display.show("P")  # Indication de changement de phase
    
    params = gestionnaire.obtenir_parametres_actuels()
    # Ajuster les conditions selon les paramètres
    
    sleep(60000)  # Vérification toutes les minutes
```

### Exercice 3.2 : Adaptation Climatique Intelligente
Créez un système qui s'adapte aux conditions extérieures.

```python
class AdaptateurClimatique:
    def __init__(self):
        self.historique = []
        self.taille_historique = 24  # 24 dernières heures
    
    def ajouter_mesure(self, temperature, humidite):
        self.historique.append({
            'temperature': temperature,
            'humidite': humidite,
            'timestamp': running_time()
        })
        
        if len(self.historique) > self.taille_historique:
            self.historique.pop(0)
    
    def calculer_ajustements(self):
        if not self.historique:
            return None
        
        temp_moy = sum(m['temperature'] for m in self.historique) / len(self.historique)
        hum_moy = sum(m['humidite'] for m in self.historique) / len(self.historique)
        
        ajustements = {
            'intensite_lumiere': 1023,  # Valeur par défaut
            'duree_eclairage': 12,      # Heures par défaut
        }
        
        # Ajustements selon les tendances
        if temp_moy > 25:
            ajustements['intensite_lumiere'] = 512  # Réduction de moitié
        if hum_moy > 70:
            ajustements['duree_eclairage'] = 10     # Réduction du temps d'éclairage
        
        return ajustements

# Utilisation
adaptateur = AdaptateurClimatique()

# Dans la boucle principale
while True:
    temp = dht11.temperature()
    hum = dht11.humidity()
    
    adaptateur.ajouter_mesure(temp, hum)
    ajustements = adaptateur.calculer_ajustements()
    
    if ajustements:
        # Appliquer les ajustements
        lumiere.definir_intensite(ajustements['intensite_lumiere'])
    
    sleep(3600000)  # Mise à jour horaire
```

## Série 4 : Optimisation et Performance

### Exercice 4.1 : Gestion Énergétique
Implémentez un système de gestion intelligente de l'énergie.

```python
class GestionnaireEnergie:
    def __init__(self):
        self.mode_eco = False
        self.horaire_eco = {'debut': 22, 'fin': 6}
        self.consommation = {
            'led': 0,
            'capteurs': 0,
            'total': 0
        }
        self.dernier_reveil = 0
        self.interval_eco = 5000  # 5 secondes en mode éco
        self.interval_normal = 1000  # 1 seconde en mode normal
    
    def verifier_horaire(self, heure_actuelle):
        """Vérifie si on doit être en mode éco selon l'heure"""
        if self.horaire_eco['debut'] <= heure_actuelle or heure_actuelle < self.horaire_eco['fin']:
            self.activer_mode_eco()
        else:
            self.desactiver_mode_eco()
    
    def activer_mode_eco(self):
        """Active le mode économie d'énergie"""
        if not self.mode_eco:
            self.mode_eco = True
            display.show("E")
    
    def desactiver_mode_eco(self):
        """Désactive le mode économie d'énergie"""
        if self.mode_eco:
            self.mode_eco = False
            display.show("N")
    
    def calculer_consommation(self, intensite_led):
        """Calcule la consommation énergétique approximative"""
        self.consommation['led'] = intensite_led * 0.02  # 20mA par unité d'intensité
        self.consommation['capteurs'] = 5  # 5mA fixe pour les capteurs
        self.consommation['total'] = self.consommation['led'] + self.consommation['capteurs']
    
    def doit_reveiller(self):
        """Détermine si on doit effectuer une lecture des capteurs"""
        temps_actuel = running_time()
        interval = self.interval_eco if self.mode_eco else self.interval_normal
        
        if temps_actuel - self.dernier_reveil >= interval:
            self.dernier_reveil = temps_actuel
            return True
        return False

# Exemple d'utilisation
gestionnaire_energie = GestionnaireEnergie()

def boucle_principale_econome():
    while True:
        # Vérification de l'heure (à adapter selon votre système de temps)
        heure_actuelle = (running_time() // 3600000) % 24
        gestionnaire_energie.verifier_horaire(heure_actuelle)
        
        if gestionnaire_energie.doit_reveiller():
            # Lecture des capteurs
            temp = dht11.temperature()
            hum = dht11.humidity()
            
            # Ajustement de l'éclairage
            intensite = 512 if gestionnaire_energie.mode_eco else 1023
            led_rgb.definir_intensite(intensite)
            
            # Calcul de la consommation
            gestionnaire_energie.calculer_consommation(intensite)
            
            # Affichage périodique de la consommation
            print(f"Consommation: {gestionnaire_energie.consommation['total']}mA")
        
        sleep(100)  # Courte pause pour éviter la surcharge CPU

### Exercice 4.2 : Optimisation des Lectures
Implémentez un système de lecture optimisée des capteurs avec mise en cache.

```python
class LectureOptimisee:
    def __init__(self):
        self.cache = {
            'temperature': {'valeur': None, 'timestamp': 0},
            'humidite': {'valeur': None, 'timestamp': 0},
            'humidite_sol': {'valeur': None, 'timestamp': 0}
        }
        self.duree_cache = {
            'temperature': 2000,    # 2 secondes
            'humidite': 2000,      # 2 secondes
            'humidite_sol': 5000   # 5 secondes
        }
        self.erreurs = {
            'temperature': 0,
            'humidite': 0,
            'humidite_sol': 0
        }
    
    def lire_capteur(self, type_capteur):
        """Lecture avec gestion du cache et des erreurs"""
        temps_actuel = running_time()
        cache = self.cache[type_capteur]
        
        # Vérification si la valeur en cache est encore valide
        if (cache['valeur'] is not None and 
            temps_actuel - cache['timestamp'] < self.duree_cache[type_capteur]):
            return cache['valeur']
        
        try:
            # Lecture du capteur approprié
            if type_capteur == 'temperature':
                valeur = dht11.temperature()
            elif type_capteur == 'humidite':
                valeur = dht11.humidity()
            else:  # humidite_sol
                valeur = pin1.read_analog()
            
            # Mise à jour du cache
            self.cache[type_capteur] = {
                'valeur': valeur,
                'timestamp': temps_actuel
            }
            self.erreurs[type_capteur] = 0
            return valeur
            
        except Exception as e:
            self.erreurs[type_capteur] += 1
            print(f"Erreur lecture {type_capteur}: {e}")
            
            # Retourne la dernière valeur valide si disponible
            if cache['valeur'] is not None:
                return cache['valeur']
            return None
    
    def verifier_sante_capteurs(self):
        """Vérifie l'état de santé des capteurs"""
        rapport = {}
        for capteur, erreurs in self.erreurs.items():
            if erreurs > 3:
                rapport[capteur] = "Défaillant"
            elif erreurs > 0:
                rapport[capteur] = "Instable"
            else:
                rapport[capteur] = "OK"
        return rapport

# Exemple d'utilisation
lecture = LectureOptimisee()

while True:
    # Lecture optimisée des capteurs
    temp = lecture.lire_capteur('temperature')
    hum = lecture.lire_capteur('humidite')
    sol = lecture.lire_capteur('humidite_sol')
    
    # Vérification périodique de la santé des capteurs
    if running_time() % 60000 == 0:  # Toutes les minutes
        sante = lecture.verifier_sante_capteurs()
        print("État des capteurs:", sante)
    
    sleep(100)

### Exercice 4.3 : Gestion de la Mémoire
Implémentez un système de gestion efficace de la mémoire pour les données historiques.

```python
class GestionnaireMemoireCirculaire:
    def __init__(self, taille_max=100):
        self.taille_max = taille_max
        self.donnees = []
        self.index_ecriture = 0
        self.memoire_utilisee = 0
    
    def ajouter_mesure(self, mesure):
        """Ajoute une mesure dans le buffer circulaire"""
        if len(self.donnees) < self.taille_max:
            self.donnees.append(mesure)
        else:
            # Écrase les anciennes données en rotation
            self.donnees[self.index_ecriture] = mesure
            
        self.index_ecriture = (self.index_ecriture + 1) % self.taille_max
        self.mettre_a_jour_memoire()
    
    def obtenir_dernieres_mesures(self, nombre):
        """Récupère les n dernières mesures"""
        if nombre > len(self.donnees):
            return self.donnees.copy()
        
        debut = (self.index_ecriture - nombre) % len(self.donnees)
        if debut < self.index_ecriture:
            return self.donnees[debut:self.index_ecriture]
        else:
            return self.donnees[debut:] + self.donnees[:self.index_ecriture]
    
    def mettre_a_jour_memoire(self):
        """Calcule l'utilisation approximative de la mémoire"""
        taille_mesure = 16  # Estimation en octets par mesure
        self.memoire_utilisee = len(self.donnees) * taille_mesure
    
    def nettoyer_anciennes_donnees(self, seuil_age_ms):
        """Nettoie les données plus anciennes qu'un certain seuil"""
        temps_actuel = running_time()
        self.donnees = [m for m in self.donnees 
                       if temps_actuel - m.get('timestamp', 0) < seuil_age_ms]
        self.mettre_a_jour_memoire()

# Exemple d'utilisation
gestionnaire_memoire = GestionnaireMemoireCirculaire(taille_max=1000)

def collecter_donnees():
    while True:
        # Création d'une nouvelle mesure
        mesure = {
            'timestamp': running_time(),
            'temperature': dht11.temperature(),
            'humidite': dht11.humidity(),
            'humidite_sol': pin1.read_analog()
        }
        
        # Ajout dans le gestionnaire de mémoire
        gestionnaire_memoire.ajouter_mesure(mesure)
        
        # Nettoyage périodique des anciennes données
        if running_time() % 3600000 == 0:  # Toutes les heures
            gestionnaire_memoire.nettoyer_anciennes_donnees(3600000)  # 1 heure
            print(f"Mémoire utilisée: {gestionnaire_memoire.memoire_utilisee} octets")
        
        sleep(1000)
```

Ces exercices d'optimisation permettent d'améliorer significativement les performances et la fiabilité du système. Ils peuvent être combinés pour créer une solution complète et efficace.

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
