let countries = [];
let countries2 = [];
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const btnCrois = document.getElementById("minToMax");
const btnDécrois = document.getElementById("maxToMin");
const btnAlpha = document.getElementById("alpha");
const countriescontainer = document.getElementsByClassName(
  "countries-container",
)[0];

let Try = "";

const fetchcountry = async () => {
  await fetch(
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags",
  )
    .then((res) => res.json())
    .then((data) => (countries = data));

  console.log(countries);
};
fetchcountry();

function countrydisplay() {
  CountryTri();
  countriescontainer.innerHTML = "";
  countries2.map((country) => {
    countriescontainer.innerHTML += `
    <ul class="cards">
    <li><img src="${country.flags.png}" alt="${country.flags.alt}"></li>
    <li><h4>${country.name.common}</h4></li>
    <li><h5>${country.capital}</h5></li>
    <li><p>Population : ${country.population}</p></li>
    </ul>
    `;
  });
}

function countryfilter() {
  countries2 = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(inputSearch.value.toLowerCase());
  });
}

inputSearch.addEventListener("input", () => {
  countryfilter();
  countries2 = countries2.slice(0, inputRange.value);
  countrydisplay();
});

inputRange.addEventListener("input", () => {
  countryfilter();
  rangeValue.textContent = inputRange.value;
  countries2 = countries2.slice(0, inputRange.value);
  countrydisplay();
});

function CountryTri() {
  if (Try == "a-b") {
    CountryTrie1();
  } else if (Try == "b-a") {
    CountryTrie2();
  } else if (Try == "alpha") {
    CountryTrie3();
  }
}

function CountryTrie1() {
  countries2.sort((a, b) => a.population - b.population);
}

function CountryTrie2() {
  countries2.sort((a, b) => b.population - a.population);
}

function CountryTrie3() {
  countries2.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

btnCrois.addEventListener("click", () => {
  Try = "a-b";
  CountryTrie1();
  countrydisplay();
});

btnDécrois.addEventListener("click", () => {
  Try = "b-a";
  CountryTrie2();
  countrydisplay();
});

btnAlpha.addEventListener("click", () => {
  Try = "alpha";
  CountryTrie3();
  countrydisplay();
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
