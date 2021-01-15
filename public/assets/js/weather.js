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
                }
                $("#searchCityInput").val("")
            })
    })


    const searchWeather = (city, today) => {
        fetch(`https://arcane-taiga-66168.herokuapp.com/api/currentWeather/${city}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res)


            let listOfNextThreeDays = []
            let listOfNexstThreeTemps = []


            // CURRENT WEATHER FORECAST
            let currentWeatherData = res.currentWeather
            //  console.log(res.currentWeather)
                $("#currentCity").text(`${today} in ${currentWeatherData.name} -`)
                $("#todaysWeather").text(currentWeatherData.weather[0].description)
                $("#temperature").text(`${currentWeatherData.main.temp} °`)
                $("#currentWeatherIcon").text(processWeatherIcon(currentWeatherData.weather[0].description))
                localStorage.setItem("previousSearch", currentWeatherData.name)



                // ADDING IN FIVE DAY FORECAST
                let fiveDayForecastData = res.fiveDayForecast
                // console.log(fiveDayForecastData)


                $("#threeDayForecast").empty()
                $("#threeDayForecast").append("<div class=\"row\">");

                for (var i = 8; i < fiveDayForecastData.list.length - 8; i++) {

                if (fiveDayForecastData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    listOfNextThreeDays.push(processDay(new Date(fiveDayForecastData.list[i].dt_txt)))
                    listOfNexstThreeTemps.push(fiveDayForecastData.list[i].main.temp_max)
                    var col = $("<div>").addClass("col-4");
                    var card = $("<div>").addClass("card shadow threeDayForecastCard");
                    var body = $("<div>").addClass("card-body");
        
                    var day = $("<h5>").addClass("card-title").text(processDay(new Date(fiveDayForecastData.list[i].dt_txt), true));
                    
                    var emoji = $("<span>").text(processWeatherIcon(fiveDayForecastData.list[i].weather[0].description)).addClass("threeDayEmoji")
        
                    var p1 = $("<p>").addClass("card-text").text("Temp: " + fiveDayForecastData.list[i].main.temp_max + " °F");
                    var p2 = $("<p>").addClass("card-text").text("Humidity: " + fiveDayForecastData.list[i].main.humidity + "%");
        
                    col.append(card.append(body.append(day, emoji, p1, p2)));
                    $("#threeDayForecast .row").append(col);
                }
            }


            let listOfNextFiveDays = []
            let listOfNextFiveTemps = []

            for(let i = 8; i < fiveDayForecastData.list.length; i+=8){
                listOfNextFiveDays.push(processDay(new Date(fiveDayForecastData.list[i].dt_txt), true))
                listOfNextFiveTemps.push(fiveDayForecastData.list[i].main.temp_max)
            }

            // console.log(listOfNextFiveDays)
            // create 5 day temp chart
            var myChart = new Chart($("#myChart"), {
                type: 'line',
                data:
                {
                    labels: listOfNextFiveDays,
                    datasets: [{
                        label: 'Avg Temp at this Time',
                        data: listOfNextFiveTemps,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
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


    const processWeatherIcon = (weatherStatus) => {
        switch(weatherStatus) {
            case "clear sky":
                return "🏞️"
            break;
            case "few clouds":
                return "☁️"
            break;
            case "scattered clouds":
                return "🌤️ "
            break;
            case "overcast clouds":
                return "🌥️"
            break;
            case "broken clouds":
                return "🌥️"
            break;
            case "shower rain":
                return "🌧️"
            break;
            case "rain":
                return "☔"
            case "thunderstorm":
                return "⛈️"
            break; 
            case "snow":
                return '❄️'
            break; 
            case "mist":
                return "🌁"
            break; 

            default:
                return "🤷"
        }
    }


