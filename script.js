document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value

    if (input !== "") {
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,

            })
        } else {
            showWarning('Localização não encontrada.')
        }
    }

});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block'
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}