

// window.addEventListener("load", )

$( document ).ready(() => {
    console.log("Yay pocket weather!")


    let today = processDay()


    $("#todaysWeather").text(`${today} - `)


 

    $("#headDiv").click( (e) => {
        e.preventDefault()
        console.log(e.target.id)

        switch(e.target.id) {
            case "searchCityEmoji":
                searchCity($( "#searchCityInput").val(), today)
                break;
            case "newEvent":
                // run function!
                break;
            default:
                console.log("click")
          }
          $("#searchCityInput").val("")
    })


})

    const searchCity = (city, today) => {
        console.log(city)
        // console.log(today)

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9d900c46a82ac29300d02baa0107cbe8`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            $("#currentCity").text(`${today} in ${data.name} -`)
            $("#todaysWeather").text(data.weather[0].description)
            $("#temperature").text(`${data.main.temp} °`)
            $("#currentWeatherIcon").text("🌞")

        })
    }



    const processDay = () => {
        let date = new Date ()
        let todaysNumber = date.getDay()
        
        switch(todaysNumber) {
            case 1:
                return "Monday"
            break;
            case 2:
                return "Tuesday"
            break;
            case 3:
                return "Wednesday"
            break;
            case 4:
                return "Thursday"
            break;
            case 5:
                return "Friday"
            break;
            case 6:
                return "Saturday"
            case 7:
                return "Sunday"
            break; 
        }
    }


    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      const success = (pos) => {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      const error = (err) =>  {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    //   use to call geolocation cordinates when ready.
    //   navigator.geolocation.getCurrentPosition(success, error, options);


