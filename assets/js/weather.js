    $( document ).ready(() => {
        let date = new Date ()
        let today = processDay(date)
        $("#todaysWeather").text(`${today} - `)
        let previous = localStorage.getItem("previousSearch")

            if(previous){
                searchWeather(previous, today)
            }


            $("#headDiv").click( (e) => {
                e.preventDefault()

                switch(e.target.id) {
                    case "searchCityEmoji":
                        searchWeather($( "#searchCityInput").val(), today)
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


    const searchWeather = (city, today) => {
        fetch(`http://localhost:3000/api/currentWeather/${city}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res)

            // CURRENT WEATHER FORECAST
            let currentWeatherData = res.currentWeather
             // console.log(res.currentWeather)
                $("#currentCity").text(`${today} in ${currentWeatherData.name} -`)
                $("#todaysWeather").text(currentWeatherData.weather[0].description)
                $("#temperature").text(`${currentWeatherData.main.temp} °`)
                $("#currentWeatherIcon").text("🌞")
                localStorage.setItem("previousSearch", currentWeatherData.name)



                // ADDING IN FIVE DAY FORECAST
                let fiveDayForecastData = res.fiveDayForecast
                // console.log(fiveDayForecastData)


                $("#threeDayForecast").empty()
                $("#threeDayForecast").append("<div class=\"row\">");

                for (var i = 0; i < fiveDayForecastData.list.length - 16; i++) {

                if (fiveDayForecastData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
    
                    var col = $("<div>").addClass("col-4");
                    var card = $("<div>").addClass("card shadow");
                    var body = $("<div>").addClass("card-body");
        
                    var day = $("<h5>").addClass("card-title").text(processDay(new Date(fiveDayForecastData.list[i].dt_txt), true));
                    
                    var emoji = $("<span>").text("⛅").addClass("threeDayEmoji")
        
                    var p1 = $("<p>").addClass("card-text").text("Temp: " + fiveDayForecastData.list[i].main.temp_max + " °F");
                    var p2 = $("<p>").addClass("card-text").text("Humidity: " + fiveDayForecastData.list[i].main.humidity + "%");
        
                    col.append(card.append(body.append(day, emoji, p1, p2)));
                    $("#threeDayForecast .row").append(col);
                }
            }
        })
    }


    const processDay = (date, shorten) => {
         let todaysNumber = date.getDay()
        if(!shorten){
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
                case 0:
                    return "Sunday"
                break; 
            }
        } else {
            switch(todaysNumber) {
                case 1:
                    return "Mon:"
                break;
                case 2:
                    return "Tues:"
                break;
                case 3:
                    return "Wed:"
                break;
                case 4:
                    return "Thurs:"
                break;
                case 5:
                    return "Fri:"
                break;
                case 6:
                    return "Sat:"
                case 0:
                    return "Sun:"
                break; 
            }
        }
    }


