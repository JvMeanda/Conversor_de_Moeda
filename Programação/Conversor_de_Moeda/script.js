"use strict";

const label_from_currency = document.getElementById("from_currency");
const input_from_amount = document.getElementById("from_amount");
const label_to_currency = document.getElementById("to_currency");
const input_to_amount = document.getElementById("to_amount");

const money_info = document.getElementById("money_info");
const swap = document.getElementById("swap");

label_from_currency.addEventListener("change", calculate);
input_from_amount.addEventListener("input", calculate);
label_to_currency.addEventListener("change", calculate);
input_to_amount.addEventListener("input", calculate);
swap.addEventListener("click", infoSwap);

main();

function main() {
  let currency = {
    BRL: "Real",
    EUR: "Euro",
    USD: "Dólar Americano",
    CAD: "Dólar Canadense",
    AUD: "Dólar Australiano",
    ZAR: "Rand (África do Sul)",
    KRW: "Won (Coreia do Sul)",
    GBP: "Libra Esterlina (Reino Unido)",
    LBP: "Libra Libanesa (Líbano)",
    CHF: "Franco Suíço (Suíça)",
    SAR: "Rial Saudita (Arábia Saudita)",
    BOB: "Boliviano",
    CLP: "Peso Chileno",
    ARS: "Peso Argentino",
    COP: "Peso Colombiano",
    CUP: "Peso Cubano",
    MXN: "Peso Mexicano",
    CNY: "Yuan (China)",
    JPY: "Yen (Japão)",
    RUB: "Rublo Russo",
    AOA: "Kwanza (Angola)",
  };

  let options = [];
  for (var [key, value] of Object.entries(currency)) {
    options.push(`<option value ='${key}'>${value}</option>`);
  }
  label_from_currency.innerHTML = options.join("\n");
  label_to_currency.innerHTML = options.join("\n");
  calculate();
}

function infoSwap() {
  let btn = label_from_currency.value;
  label_from_currency.value = label_to_currency.value;
  label_to_currency.value = btn;
  calculate();
}

async function getURL(url) {
  return (await fetch(url)).json();
}

async function calculate() {
  let from = label_from_currency.value;
  let to = label_to_currency.value;
  let { rates } = await getURL(
    `https://api.exchangerate-api.com/v4/latest/${from}`
  );

  let rate = rates[to];
  money_info.innerText = input_to_amount.value = (
    input_from_amount.value * rate
  ).toFixed(2);
}
