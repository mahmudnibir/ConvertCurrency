const apiKey = '8261c914436cd94e7afe22ff'; // Your API key

// Array of available currencies
const currencies = [
    "USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY", "CNY", "MXN", "BRL"
];

// Populate the dropdown with available currencies
function populateCurrencyDropdowns() {
    const fromCurrencyDropdown = document.getElementById('fromCurrency');
    const toCurrencyDropdown = document.getElementById('toCurrency');
    
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencyDropdown.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencyDropdown.appendChild(optionTo);
    });
}

// Call this function when the user clicks the 'Convert' button
function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || !fromCurrency || !toCurrency) {
        showError('Please fill in all fields.');
        return;
    }

    showLoading();

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success" && data.conversion_rates[toCurrency]) {
                const conversionRate = data.conversion_rates[toCurrency];
                const result = (amount * conversionRate).toFixed(2);
                showResult(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
            } else {
                showError('Invalid currency pair or API error.');
            }
        })
        .catch(error => {
            showError('Failed to fetch data. Please try again later.');
            console.error(error);
        });
}

// Display result in the UI
function showResult(resultText) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").textContent = resultText;
    document.getElementById("error").style.display = "none";
    document.getElementById("result").style.display = "block";
}

// Show loading state
function showLoading() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("error").style.display = "none";
}

// Show error message
function showError(errorMessage) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("error").textContent = errorMessage;
    document.getElementById("error").style.display = "block";
}

// Initialize the dropdowns on page load
populateCurrencyDropdowns();
