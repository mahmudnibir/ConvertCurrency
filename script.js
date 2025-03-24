function convertCurrency() {
     const amount = document.getElementById("amount").value;
     const fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
     const toCurrency = document.getElementById("toCurrency").value.toUpperCase();
 
     const apiKey = "8261c914436cd94e7afe22ff"; // Replace with your API key
 
     if (!amount || !fromCurrency || !toCurrency) {
         alert("Please fill in all fields.");
         return;
     }
 
     const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
 
     fetch(url)
         .then(response => response.json())
         .then(data => {
             if (data.result === "success") {
                 const conversionRate = data.conversion_rates[toCurrency];
                 if (conversionRate) {
                     const result = (amount * conversionRate).toFixed(2);
                     document.getElementById("result").innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
                 } else {
                     document.getElementById("result").innerHTML = "Invalid target currency.";
                 }
             } else {
                 document.getElementById("result").innerHTML = "Error in fetching data.";
             }
         })
         .catch(error => {
             document.getElementById("result").innerHTML = "Failed to fetch data. Try again later.";
             console.error(error);
         });
 }
 