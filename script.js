let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('nextbutton')
    const backButton = document.getElementById('backbutton')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((characters) => {
            const card = document.createElement('div')
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace( /\D/g, "")}.jpg')`
            card.className = "cards"

            const charactersNameBG = document.createElement('div')
            charactersNameBG.className = "character-name-bg"

            const charactersName = document.createElement('span')
            charactersName.className = "character-name"
            charactersName.innerText = `${characters.name}`

            charactersNameBG.appendChild(charactersName)
            card.appendChild(charactersNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible" 

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = '' //limpar todo conteudo dentro do modal 

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${characters.url.replace( /\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement('span')
                name.className = "character-details"
                name.innerText = `Nome: ${characters.name}`

                const characterHeigth = document.createElement('span')
                characterHeigth.className = "character-details"
                characterHeigth.innerText = `Altura: ${convertHeigth(characters.height)}`

                const mass = document.createElement('span')
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(characters.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(characters.eye_color) }`

                const birthYear = document.createElement('span')
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(characters.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeigth)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('nextbutton')
        const backButton = document.getElementById('backbutton')

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    }catch (error) {
        alert('Erro ao carregar os personagens')      
        console.log(error)  
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a proxima pagina')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a pagina anterior')
    }
}

function hidemodal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecido"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeigth(heigth) {
    if (heigth === "unknown") {
        return "desconhecida"
    }

    return (heigth /100).toFixed(2);
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }

    return birthYear
}