

// window.addEventListener("load", )

    $( document ).ready(() => {
        let date = new Date ()
        let today = processDay(date)
        $("#todaysWeather").text(`${today} - `)
        let previous = localStorage.getItem("previousSearch")

            if(previous){
                searchCity(previous, today)
                threeDay(previous)
            }


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
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9d900c46a82ac29300d02baa0107cbe8`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            $("#currentCity").text(`${today} in ${data.name} -`)
            $("#todaysWeather").text(data.weather[0].description)
            $("#temperature").text(`${data.main.temp} °`)
            $("#currentWeatherIcon").text("🌞")
            localStorage.setItem("previousSearch", data.name)
        })
    }





    const threeDay = (searchValue) => {
        fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=9d900c46a82ac29300d02baa0107cbe8&units=imperial")
            .then(res => res.json())
            .then(data =>  {
                console.log(data)
                $("#threeDayForecast").html("<h4 class=\"mt-3\">Predictions:</h4>").append("<div class=\"row\">");

                for (var i = 0; i < data.list.length - 16; i++) {

                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
    
                    var col = $("<div>").addClass("col-4");
                    var card = $("<div>").addClass("card shadow");
                    var body = $("<div>").addClass("card-body");
        
                    var day = $("<h5>").addClass("card-title").text(processDay(new Date(data.list[i].dt_txt), true));
                    
                    var emoji = $("<span>").text("⛅").addClass("threeDayEmoji")
        
                    var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                    var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
        
                    // merge together and put on page
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
                case 7:
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
                case 7:
                    return "Sun:"
                break; 
            }
        }
    }


