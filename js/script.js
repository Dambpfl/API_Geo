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

                option.dataset.coordinates = ville.centre.coordinates
                console.log("coordinates --->",option.dataset.coordinates)

                var coordinates = option.dataset.coordinates
                console.log(coordinates)
                
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

const ville = document.getElementById("ville")

ville.addEventListener("change", function(event) {
    var choise = event.target.value
    console.log("CHOISE ----->",choise)
    fetch(`http://geo.api.gouv.fr/communes?code=${choise}&fields=region,nom,centre,codePostaux`)
        .then((response) => response.json())
        .then((data) => {
            
            longitude = data[0].centre.coordinates[0]           
            latitude = data[0].centre.coordinates[1]      

            map.setView([latitude, longitude], 13);
            var marker = L.marker([latitude, longitude]).addTo(map)
        })                
}) 
