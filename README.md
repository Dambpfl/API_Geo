# 🗺️ API Geo - Localisation des Communes Françaises

Une application web interactive qui permet de rechercher et localiser les communes françaises sur une carte interactive en utilisant l'API officielle du gouvernement français.

## 🌟 Fonctionnalités

- **🔍 Recherche par code postal** : Saisissez un code postal pour obtenir la liste des communes correspondantes
- **📍 Géolocalisation précise** : Sélectionnez une ville pour centrer automatiquement la carte sur sa position
- **🗺️ Carte interactive** : Navigation fluide avec zoom et marqueurs personnalisés
- **📱 Interface responsive** : Fonctionne sur desktop et mobile

## 🛠️ Technologies utilisées

- **HTML5** : Structure de l'application
- **CSS3** : Mise en forme et style
- **JavaScript (ES6+)** : Logique applicative
- **Leaflet.js** : Bibliothèque de cartographie interactive
- **OpenStreetMap** : Tuiles de carte
- **API Geo du Gouvernement** : Données officielles des communes françaises

## 📁 Structure du projet

```
API_Geo/
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles CSS
├── js/
│   └── script.js      # Logique JavaScript
└── README.md          # Documentation
```

## 🚀 Installation et utilisation

### Prérequis
- Un serveur web local (Apache, Nginx, ou serveur de développement)
- Connexion Internet (pour l'API et les tuiles de carte)

### Installation

1. **Clonez ou téléchargez** le projet dans votre répertoire web
   ```bash
   git clone https://github.com/Dambpfl/API_Geo.git
   ```

2. **Placez les fichiers** dans votre serveur web local
   - Par exemple : `c:\laragon\www\API_Geo\` (avec Laragon)
   - Ou : `/var/www/html/API_Geo/` (avec XAMPP/WAMP)

3. **Accédez à l'application** via votre navigateur :
   ```
   http://localhost/API_Geo/
   ```

### Utilisation

1. **Saisissez un code postal** dans le champ de recherche
2. **Sélectionnez une ville** dans la liste déroulante qui apparaît
3. **La carte se centre automatiquement** sur la ville sélectionnée
4. **Un marqueur s'affiche** avec le nom de la commune
5. **Naviguez sur la carte** : zoom, déplacement, etc.

## 🔧 Fonctionnement technique

### API utilisée
L'application utilise l'**API Geo du Gouvernement français** :
- **Endpoint de recherche** : `https://geo.api.gouv.fr/communes`
- **Paramètres** :
  - `codePostal` : Code postal à rechercher
  - `code` : Code INSEE de la commune
  - `fields` : Champs à récupérer (nom, centre, région, etc.)
  - `format` : Format de réponse (JSON)

### Fonctionnalités JavaScript

#### 1. Recherche par code postal
```javascript
// Écoute la saisie dans le champ code postal
inputCP.addEventListener("input", () => {
    // Requête API avec le code postal
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=...`)
    // Affichage des communes dans la liste déroulante
})
```

#### 2. Géolocalisation de la ville
```javascript
// Écoute le changement de sélection de ville
selectVille.addEventListener("change", function(event) {
    // Récupération des coordonnées GPS
    // Centrage de la carte
    map.setView([latitude, longitude], 13);
    // Ajout d'un marqueur
})
```

### Composants Leaflet
- **Carte de base** : Tuiles OpenStreetMap
- **Contrôles** : Zoom, navigation
- **Marqueurs** : Positionnement des communes
- **Popups** : Affichage du nom de la commune

## 🎨 Personnalisation

### Modifier l'apparence de la carte
Dans `css/style.css`, vous pouvez ajuster :
```css
#map {
    height: 400px;    /* Hauteur de la carte */
    width: 100%;      /* Largeur de la carte */
    border-radius: 8px; /* Coins arrondis */
}
```

### Changer le niveau de zoom
Dans `js/script.js` :
```javascript
// Zoom initial de la carte
var map = L.map('map').setView([46.603354, 1.888334], 6); // France entière

// Zoom lors de la sélection d'une ville
map.setView([latitude, longitude], 15); // Zoom plus proche
```

### Personnaliser les marqueurs
```javascript
// Marqueur personnalisé
var customIcon = L.icon({
    iconUrl: 'chemin/vers/icone.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

var marker = L.marker([latitude, longitude], {icon: customIcon}).addTo(map);
```

## 🐛 Résolution de problèmes

### La carte ne s'affiche pas
- Vérifiez votre connexion Internet
- Contrôlez la console du navigateur pour les erreurs JavaScript
- Assurez-vous que Leaflet.js est bien chargé

### Les communes ne s'affichent pas
- Vérifiez que l'API Geo est accessible
- Contrôlez le format du code postal (5 chiffres)
- Regardez la console pour les erreurs d'API

### La carte ne se centre pas sur la ville
- Vérifiez que l'événement `change` du select est bien écouté
- Contrôlez les coordonnées récupérées dans la console
- Assurez-vous que `data[0].centre.coordinates` existe

## 📞 Support

Pour toute question ou problème, vous pouvez :
- Ouvrir une issue sur GitHub
- Consulter la documentation de l'API Geo : https://geo.api.gouv.fr/
- Voir la documentation Leaflet : https://leafletjs.com/