function showToast(message, type = "success") {
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => toast.classList.add("show"), 10)

    setTimeout(() => {
        toast.classList.remove("show")
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

const $ = s => document.querySelector(s)

const hero = $(".hero")
const select = $(".game-select")

const tournamentsContainer = $(".tournaments")

const adminPanel = $(".admin")
const loginModal = $(".login-modal")
const logoutBtn = $(".logout-btn")

const inputs = {
    name: $(".name"),
    game: $(".game"),
    date: $(".date"),
    format: $(".format"),
    prize: $(".prize"),
    teams: $(".teams-input")
}

const backgrounds = {
    Valorant: "url('assets/valorant_hero-bg.jpg')",
    CS2: "url('assets/cs2_hero-bg.png')",
    Minecraft: "url('assets/minecraft_hero-bg.png')"
}

let tournaments = JSON.parse(localStorage.getItem("tournaments")) || []
let editIndex = null

// BG
select.onchange = () => {
    hero.style.background = `
    linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
    ${backgrounds[select.value]} center/cover`
}

// AUTH
const ADMIN_LOGIN = "admin"
const ADMIN_PASS = "1234"

adminPanel.classList.add("hidden")

if (localStorage.getItem("adminAuth") === "true") {
    adminPanel.classList.remove("hidden")
    logoutBtn.classList.remove("hidden")
}

$(".admin-open-btn").onclick = () =>
    loginModal.classList.remove("hidden")

$(".login-btn").onclick = () => {
    if (
        $(".username").value === ADMIN_LOGIN &&
        $(".password").value === ADMIN_PASS
    ) {
        localStorage.setItem("adminAuth", "true")
        loginModal.classList.add("hidden")
        adminPanel.classList.remove("hidden")
        logoutBtn.classList.remove("hidden")

        showToast("Успішний вхід", "success")
    } else {
        showToast("Невірний логін або пароль", "error")
    }
}

loginModal.onclick = (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add("hidden")
    }
}

logoutBtn.onclick = () => {
    localStorage.removeItem("adminAuth")
    location.reload()
}

// CREATE / UPDATE
$(".create-btn").onclick = () => {
    const teams = inputs.teams.value
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)

    if (!inputs.name.value || teams.length === 0)
        return alert("Заповни поля")

    const data = {
        name: inputs.name.value,
        game: inputs.game.value,
        date: inputs.date.value,
        format: inputs.format.value,
        prize: inputs.prize.value,
        teams
    }

    if (editIndex !== null) {
        tournaments[editIndex] = data
    } else {
        tournaments.push(data)
    }

    editIndex = null

    save()
    render()
    clearInputs()
}

// RENDER
function render() {
    tournamentsContainer.innerHTML = tournaments.map((t, i) => `
        <div class="card">
            <h3>${t.name}</h3>
            <p>${t.game}</p>
            <p>${t.date}</p>
            <p>${t.format}</p>
            <p>${t.prize}</p>
            ${isAdmin() ? `
                <button onclick="edit(${i})" class="btn">Edit</button>
                <button onclick="remove(${i})" class="btn">Delete</button>
            ` : ""}
        </div>
    `).join("")
}

// ADMIN CHECK
function isAdmin() {
    return localStorage.getItem("adminAuth") === "true"
}

// EDIT
window.edit = i => {
    const t = tournaments[i]

    Object.keys(inputs).forEach(k => {
        inputs[k].value =
            k === "teams" ? t[k].join(", ") : t[k]
    })

    editIndex = i
}

// DELETE
window.remove = i => {
    tournaments.splice(i, 1)
    save()
    render()
}

// SAVE
function save() {
    localStorage.setItem("tournaments", JSON.stringify(tournaments))
}

// CLEAR
function clearInputs() {
    Object.values(inputs).forEach(i => i.value = "")
}

// INIT
render()

$(".scroll-btn").onclick = () =>
    $(".tournaments-section")
        .scrollIntoView({ behavior: "smooth" })

$(".register-btn").onclick = () =>
    alert("Coming soon...")

const adminDropdown = document.querySelector(".admin-dropdown")

// відкриття
document.querySelector(".admin-open-btn").onclick = () => {
    if (isAdmin()) {
        adminDropdown.classList.toggle("hidden")
    } else {
        loginModal.classList.remove("hidden")
    }
}

// після логіну
if (localStorage.getItem("adminAuth") === "true") {
    adminDropdown.classList.remove("hidden")
}

const loginDropdown = document.querySelector(".login-dropdown")

document.querySelector(".admin-open-btn").onclick = () => {
    if (isAdmin()) {
        adminDropdown.classList.toggle("hidden")
    } else {
        loginDropdown.classList.toggle("hidden")
    }
}

// після логіну
$(".login-btn").onclick = () => {
    if (
        $(".username").value === ADMIN_LOGIN &&
        $(".password").value === ADMIN_PASS
    ) {
        localStorage.setItem("adminAuth", "true")

        loginDropdown.classList.add("hidden")
        adminDropdown.classList.remove("hidden")
        logoutBtn.classList.remove("hidden")

        showToast("Успішний вхід")
    } else {
        showToast("Невірний логін або пароль", "error")
    }
}