

// window.addEventListener("load", )

$( document ).ready(() => {
    console.log("Yay pocket weather!")

 

    $("#headDiv").click( (e) => {
        e.preventDefault()
        console.log(e.target.id)

        switch(e.target.id) {
            case "searchCityEmoji":
                searchCity($( "#searchCityInput").val())
                break;
            case "newEvent":
                // run function!
                break;
            default:
                console.log("click")
          }
    })




    const searchCity = (city) => {
        console.log(city)
        // fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=APIKEY')
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
    }
})