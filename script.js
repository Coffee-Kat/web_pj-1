const select = document.querySelector("select")
const hero = document.querySelector(".hero")

const backgrounds = {
    Valorant: "url('assets/valorant_hero-bg.jpg')",
    CS2: "url('assets/cs2_hero-bg.jpg')",
    Minecraft: "url('assets/minecraft_hero-bg.jpg')"
}

select.addEventListener("change", () => {
    hero.style.background =
    "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), " + backgrounds[select.value] + " center/cover"
})