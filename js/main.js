/* loading page*/

$(document).ready(function () {
    getApi();
    $('#loadingPage').fadeOut(500, function () {
        $('body').css('overflow', 'visible')
    })
})

// default color:

let currentColor = '';
let currentLogo = '';

if (localStorage.getItem('defultColor') && localStorage.getItem('defultLogo')) {
    currentColor = localStorage.getItem('defultColor');
    currentLogo = localStorage.getItem('defultLogo');
    $('.navbar-brand img').attr('src', `images/${currentLogo}.png`)
    document.body.style.setProperty('--default-color', currentColor)
}

let colors = ['#033B3D', '#0B0066', '#F2E205', '#520120', '#542EA6'];
for (let i = 0; i < colors.length; i++) {
    $('.color').eq(i).css('backgroundColor', colors[i])
};

$('.color').click(function () {
    currentColor = $(this).css('backgroundColor');
    currentLogo = $(this).html();
    $('.navbar-brand img').attr('src', `images/${currentLogo}.png`)
    document.body.style.setProperty('--default-color', currentColor)
    localStorage.setItem('defultColor', currentColor)
    localStorage.setItem('defultLogo', currentLogo)
})

// color mode:

$('.colorMode').click(function () {
    if ($(this).html() == 'Light') {
        document.body.style.setProperty('--fontMode-color', '#1E202B')
        document.body.style.setProperty('--backgroundMode-color', '#F8F9FA')
        $('.footer img').attr('src', `images/Dark.png`)
        $('.header .weatherDay').css('backgroundColor', '#D4D3D2')
        $('.header .serchInbut').css('backgroundColor', '#D4D3D2')
        $(this).css({
            'backgroundColor': 'var(--fontMode-color)',
            'color': 'var(--backgroundMode-color)'
        })
        $('.colorMode').eq(1).css({
            'backgroundColor': 'var(--backgroundMode-color)',
            'color': 'var(--fontMode-color)'
        })
    }
    else if ($(this).html() == 'Dark') {
        document.body.style.setProperty('--fontMode-color', '#F8F9FA')
        document.body.style.setProperty('--backgroundMode-color', '#1E202B')
        $('.footer img').attr('src', `images/Light.png`)
        $('.header .weatherDay').css('backgroundColor', '#1a1d20')
        $('.header .serchInbut').css('backgroundColor', '#1a1d20')
        $(this).css({
            'backgroundColor': 'var(--fontMode-color)',
            'color': 'var(--backgroundMode-color)'
        })
        $('.colorMode').eq(0).css({
            'backgroundColor': 'var(--backgroundMode-color)',
            'color': 'var(--fontMode-color)'
        })
    }
})

// get api

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function getApi(a = 'cairo') {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=69fa4a92b847451781b140501241505&q=${a}&days=3&aqi=no&alerts=no`);
    let weatherApi = await response.json();
    weatherToday(weatherApi);
    weatherTomorrow(weatherApi);
    weatherAfterTomorrow(weatherApi);
}

function weatherToday(response) {
    const date = new Date(response.current.last_updated);
    $('#today .dayOfWeek').html(days[date.getDay()]);
    $('#today .dayOfMonth').html(date.getDate() + months[date.getMonth()]);
    $('#today .country').html(response.location.name);
    $('#today .temp').html(`${response.current.temp_c}&deg;C`);
    $('#today .icon').attr('src', response.current.condition.icon);
    $('#today .text').html(response.current.condition.text);
    $('#today .cloud').html(`<i class="fa-solid fa-cloud"></i> ${response.current.cloud}%`);
    $('#today .windSpeed').html(`<i class="fa-solid fa-wind" ></i> ${response.current.wind_kph}km/h`);
    $('#today .windDegree').html(`<i class="fa-solid fa-compass"></i> ${response.current.wind_degree}&deg;`);
}

function weatherTomorrow(response) {
    const date = new Date(response.forecast.forecastday[1].date).getDay();
    $('#tomorrow .dayOfWeek').html(days[date]);
    $('#tomorrow .icon').attr('src', response.forecast.forecastday[1].day.condition.icon);
    $('#tomorrow .avgTemp').html(`${response.forecast.forecastday[1].day.avgtemp_c}&deg;C`);
    $('#tomorrow .minTemp').html(`min ${response.forecast.forecastday[1].day.mintemp_c}&deg;C`);
    $('#tomorrow .maxTemp').html(`max ${response.forecast.forecastday[1].day.maxtemp_c}&deg;C`);
    $('#tomorrow .text').html(response.forecast.forecastday[1].day.condition.text);
}

function weatherAfterTomorrow(response) {
    const date = new Date(response.forecast.forecastday[2].date).getDay();
    $('#afterTomorrow .dayOfWeek').html(days[date]);
    $('#afterTomorrow .icon').attr('src', response.forecast.forecastday[2].day.condition.icon);
    $('#afterTomorrow .avgTemp').html(`${response.forecast.forecastday[2].day.avgtemp_c}&deg;C`);
    $('#afterTomorrow .minTemp').html(`min ${response.forecast.forecastday[2].day.mintemp_c}&deg;C`);
    $('#afterTomorrow .maxTemp').html(`max ${response.forecast.forecastday[2].day.maxtemp_c}&deg;C`);
    $('#afterTomorrow .text').html(response.forecast.forecastday[2].day.condition.text);
}

// search input

$('.searchBtn').click(function(){
    getApi($('.serchInbut').val());
})
