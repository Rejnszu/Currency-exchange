let exchangeRate = document.querySelector(".exchangeRate");
let warning = document.querySelector(".warning");
let revert = document.querySelector(".revert");

let currencyList = fetch("https://api.exchangerate.host/latest")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let key of Object.keys(data.rates)) {
      let option = document.createElement("option");
      option.value = key;
      option.innerHTML = key;
      fromCurrency.append(option);
    }
    for (let key of Object.keys(data.rates)) {
      let option = document.createElement("option");
      option.value = key;
      option.innerHTML = key;
      toCurrency.append(option);
    }
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (amountIn.value.length !== 0) {
    warning.classList.remove("active");

    fetch(
      `https://api.exchangerate.host/convert?from=${fromCurrency.value}&to=${toCurrency.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        exchangeRate.innerHTML = data.result;
        amountOut.innerHTML = data.result * amountIn.value;
      });
  } else {
    warning.classList.add("active");
    amountOut.innerHTML = "";
  }
});

revert.addEventListener("click", () => {
  let oldTocurrency = toCurrency.value;
  toCurrency.value = fromCurrency.value;
  fromCurrency.value = oldTocurrency;
});
