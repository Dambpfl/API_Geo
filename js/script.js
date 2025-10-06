const inputCP = document.querySelector(".cp")
const selectVille = document.querySelector(".ville")

// Ajoute un écouteur d'événement "input" (pendant la saisie) au champ de code postal
inputCP.addEventListener("input", () => {
    // Récupère la valeur entrée dans le champ de code postal
    let value = inputCP.value
    // Vide le contenu actuel de la liste de sélection de ville
    selectVille.innerText = null
    // Effectue une requête fetch vers l'API de géolocalisation avec le code postal saisi
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,centre,codesPostaux,codeRegion&format=json&geometry=centre`)
        //Convertit la réponse en format JSON
        .then((response) => response.json())
        // une fois que les données JSON sont disponibles
        .then((data) => {
            // Affiche les données dans la console (pour debug si besoin)
            console.log(data)
            let base = document.createElement("option")
            base.innerHTML = "Veuillez choisir la ville"
            selectVille.appendChild(base)
            // Parcours chaque objet "ville" dans les données récupérées
            data.forEach((ville) => {
                // Crée un nouvel élément d'option HTML
                let option = document.createElement("option")
                // Définit la valeur de l'option comme le code de la ville
                option.value = `${ville.code}`
                // Définit le texte affiché de l'option comme le nom de la ville
                option.innerHTML = `${ville.nom}`
                
                // Ajoute l'option à la liste de sélection de ville
                selectVille.appendChild(option)
            });
    })
})

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

selectVille.addEventListener("change", function(event) {
    var choice = event.target.value
    console.log("CHOICE ----->", choice)
    
    // Vérifier qu'une ville a bien été sélectionnée
    if (choice && choice !== "") {
        fetch(`https://geo.api.gouv.fr/communes?code=${choice}&fields=region,nom,centre,codePostaux`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Données de la ville sélectionnée:", data)
                
                if (data && data.length > 0) {
                    const longitude = data[0].centre.coordinates[0]           
                    const latitude = data[0].centre.coordinates[1]      

                    // Déplacer la carte vers la ville sélectionnée
                    map.setView([latitude, longitude], 13);
                    
                    // Ajouter un marqueur sur la ville
                    var marker = L.marker([latitude, longitude]).addTo(map)
                        .bindPopup(data[0].nom)
                        .openPopup();
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error)
            })
    }
}) 
