//Asynchronous js 

let countriesContainer = document.querySelector(".countries")
//Ajax cals 


let rendorcountry = function (data ,className='') {
    const html = `
    <article class="country ${className}">
    <img class="country_img" src="${data.flags ? data.flags.png : ''}"/>
        <div class="country_data">
        <h3 class="country_name">${data.name.common}</h3>
        <h4 class="country_region">${data.region}</h4>
        <p class="country_row"><span>👫</span>${data.population / (1000000).toFixed(1)}</p>
        <p class="country_row"><span>🗣️</span>${data.languages ? Object.values(data.languages)[0] : ''}</p>
        <p class="country_row"><span>💰</span>${data.currencies ? Object.values(data.currencies)[0].name : ''}</p>
        </div>
    </article>`;
    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1;
}

let getcountrydata = function (country) {
    //ajax calls for the firt country
    let request = new XMLHttpRequest()   //old school way to request a data from the api or other sources
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
    request.send();
    request.addEventListener('load', function () {   // we should not use arrow function here because the arrow function dosnot have this prototype on its own and eventualy we will get the value as undefined
        let [data] = JSON.parse(this.responseText)  // default the data is an array so we use json too convert the array into the objects



        //rendor country main country 
        rendorcountry(data)

        const [neighbour] = data.borders;
        if (!neighbour) return;

        // new request for the border of the main country
        let request2 = new XMLHttpRequest()   //old school way to request a data from the api or other sources
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`)
        request2.send();
        request2.addEventListener("load",function(){

            const [data2]=JSON.parse(this.responseText)
            console.log(data2)
            rendorcountry(data2,"neighbour")
        })

    });
}

getcountrydata('portugal')
// getcountrydata('usa')
getcountrydata('Bharat')
