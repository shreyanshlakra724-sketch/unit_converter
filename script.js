const ConversionOptions = {
    comp: [

        { value: "byte-bit", text: "Byte to Bit" },
        { value: "byte-kilobyte", text: "Byte to Kilobyte" },
        { value: "bit-kilobyte", text: "Bit to Kilobyte" },
        { value: "bit-megabyte", text: "Bit to Megabyte" },
        { value: "bit-gigabyte", text: "Bit to Gigabyte" },
        { value: "bit-terabyte", text: "Bit to Terabyte" },
        { value: "megabyte-gigabyte", text: "Megabyte to Gigabyte" },
        { value: "gigabyte-terabyte", text: "Gigabyte to Terabyte" }

    ],

    sci: [
        { value: "c-f", text: "Celsius to Fahrenheit" },
        { value: "c-k", text: "Celsius to Kelvin" },
        { value: "k-c", text: "Kelvin to Celsius" },
        { value: "f-c", text: "Fahrenheit to Celsius" },
        { value: "f-k", text: "Fahrenheit to Kelvin" },
        { value: "k-f", text: "Kelvin to Fahrenheit" },
    ],

    curr: [
        { value: "INR-USD", text: "INR to USD" },
        { value: "INR-EUR", text: "INR to EUR" },
        { value: "INR-GBP", text: "INR to GBP" },
        { value: "INR-JPY", text: "INR to JPY" },
        { value: "INR-CAD", text: "INR to CAD" },
        { value: "INR-AUD", text: "INR to AUD" },
        { value: "INR-CHF", text: "INR to CHF" },
        { value: "INR-CNY", text: "INR to CNY" }
    ],

    unit: [
        { value: "kg-g", text: "Kilograms to Grams" },
        { value: "kg-quintal", text: "Kilograms to Quintals" },
        { value: "tonne-kg", text: "Tonnes to Kilograms" },
        { value: "km-m", text: "Kilometers to Meters" },
        { value: "m-cm", text: "Meters to Centimeters" },
        { value: "m-mm", text: "Meters to Millimeters" },
        { value: "cm-mm", text: "Centimeters to Millimeters" },
    ]
}


let CurrencyRate = {};

const FieldSelector = document.getElementById("Field-Selector");
const TypeSelector = document.getElementById("Type-Selector");
const inputField = document.getElementById("Input-Value");
const ResultValue = document.getElementById("Result-Value");


async function CurrencyRateFetcher() {
    try {
        const response = await fetch(
            "https://api.frankfurter.dev/v2/rates?base=INR"
        );

        const data = await response.json();

        CurrencyRate = {};

        data.forEach(rate => {
            CurrencyRate[rate.quote] = rate.rate;
        });

    } catch (error) {
        console.error("Currency API error:", error);

        CurrencyRate = {
            USD: 0.0104,
            EUR: 0.0092,
            GBP: 0.0082,
            JPY: 1.85,
            CAD: 0.0145,
            AUD: 0.016,
            CHF: 0.0091,
            CNY: 0.073
        };
    }

    updateSubtypes();
    convert();
}


function updateSubtypes() {

    const selectedField = FieldSelector.value;

    TypeSelector.innerHTML = "";

    ConversionOptions[selectedField].forEach(option => {

        const newOption = document.createElement("option");

        newOption.value = option.value;
        newOption.textContent = option.text;

        TypeSelector.appendChild(newOption);
    });
}


function convert() {

    const value = Number(inputField.value);
    const conversion = TypeSelector.value;

    if (inputField.value === "") {
        ResultValue.textContent = "Enter value for a conversion:";
        return;
    }

    let result;

    switch (conversion) {

        case "byte-bit":
            result = value * 8;
            break;

        case "byte-kilobyte":
            result = value / 1024;
            break;

        case "bit-kilobyte":
            result = value / 8192;
            break;

        case "bit-megabyte":
            result = value / 8388608;
            break;

        case "bit-gigabyte":
            result = value / 8589934592;
            break;

        case "bit-terabyte":
            result = value / 8796093022208;
            break;

        case "megabyte-gigabyte":
            result = value / 1024;
            break;

        case "gigabyte-terabyte":
            result = value / 1024;
            break;

        case "c-f":
            result = (value * 9 / 5) + 32;
            break;

        case "c-k":
            result = value + 273.15;
            break;

        case "k-c":
            result = value - 273.15;
            break;

        case "f-c":
            result = (value - 32) * 5 / 9;
            break;

        case "f-k":
            result = ((value - 32) * 5 / 9) + 273.15;
            break;

        case "k-f":
            result = ((value - 273.15) * 9 / 5) + 32;
            break;

        case "INR-USD":
            result = value * CurrencyRate.USD;
            break;

        case "INR-EUR":
            result = value * CurrencyRate.EUR;
            break;

        case "INR-GBP":
            result = value * CurrencyRate.GBP;
            break;

        case "INR-JPY":
            result = value * CurrencyRate.JPY;
            break;

        case "INR-CAD":
            result = value * CurrencyRate.CAD;
            break;

        case "INR-AUD":
            result = value * CurrencyRate.AUD;
            break;

        case "INR-CHF":
            result = value * CurrencyRate.CHF;
            break;

        case "INR-CNY":
            result = value * CurrencyRate.CNY;
            break;

        case "kg-g":
            result = value * 1000;
            break;

        case "kg-quintal":
            result = value / 100;
            break;

        case "tonne-kg":
            result = value * 1000;
            break;

        case "km-m":
            result = value * 1000;
            break;

        case "m-cm":
            result = value * 100;
            break;

        case "m-mm":
            result = value * 1000;
            break;

        case "cm-mm":
            result = value * 10;
            break;

        default:
            result = "Invalid conversion";
    }

    ResultValue.textContent = result;
}


FieldSelector.addEventListener("change", updateSubtypes);

TypeSelector.addEventListener("change", convert);

inputField.addEventListener("input", convert);

updateSubtypes();
CurrencyRateFetcher();