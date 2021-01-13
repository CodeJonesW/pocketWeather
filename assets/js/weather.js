

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
          $("#searchCityInput").val("")
    })




    const searchCity = (city) => {
        console.log(city)
        fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=9d900c46a82ac29300d02baa0107cbe8')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
})