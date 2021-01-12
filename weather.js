

window.addEventListener("load", () => {
    console.log("Yay pocket weather!")

    fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=APIKEY')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
})