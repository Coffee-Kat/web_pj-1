const hero = document.querySelector(".hero")
const select = document.querySelector(".game-select")

const backgrounds = {
    Valorant: "url('assets/valorant_hero-bg.jpg')",
    CS2: "url('assets/cs2_hero-bg.png')",
    Minecraft: "url('assets/minecraft_hero-bg.png')"
}

select.addEventListener("change", () => {
    hero.style.background =
    "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), " + backgrounds[select.value] + " center/cover"
})

let tournaments = []

document.querySelector(".create-btn").addEventListener("click", createTournament)
document.querySelector(".scroll-btn").addEventListener("click", scrollToTournaments)
document.querySelector(".register-btn").addEventListener("click", register)

function createTournament() {
    const tournament = {
        name: document.querySelector(".name").value,
        game: document.querySelector(".game").value,
        date: document.querySelector(".date").value,
        format: document.querySelector(".format").value,
        prize: document.querySelector(".prize").value,
        teams: document.querySelector(".teams-input").value.split(",")
    }

    tournaments.push(tournament)

    renderTournaments()
    renderTeams(tournament.teams)
    generateBracket(tournament.teams)
}

function renderTournaments() {
    const container = document.querySelector(".tournaments")
    container.innerHTML = ""

    tournaments.forEach(t => {
        container.innerHTML += `
        <div class="card">
            <h3>${t.name}</h3>
            <p>${t.game}</p>
            <p>${t.date}</p>
            <p>${t.format}</p>
            <p>${t.prize}</p>
            <button class="btn">Join</button>
        </div>
        `
    })
}

function renderTeams(teams) {
    const container = document.querySelector(".teams")
    container.innerHTML = ""

    teams.forEach(t => {
        container.innerHTML += `<div class="card">${t.trim()}</div>`
    })
}

function generateBracket(teams) {
    const container = document.querySelector(".bracket")
    container.innerHTML = ""

    for (let i = 0; i < teams.length; i += 2) {
        const team1 = teams[i] || "TBD"
        const team2 = teams[i + 1] || "TBD"

        container.innerHTML += `
        <div class="match">
            <p>${team1} vs ${team2}</p>
        </div>
        `
    }
}

function scrollToTournaments() {
    document.querySelector(".tournaments-section")
        .scrollIntoView({ behavior: "smooth" })
}

function register() {
    alert("Comming soon...")
}