
async function submitForm(event) {
    event.preventDefault();

    const xValue = parseFloat(document.getElementById("xSelect").value);
    const yInputElement = document.getElementById("YInput");
    const yInputValue = yInputElement.value;
    const rValue = parseFloat(document.getElementById("rValue").value);

    let errorsStr = "";

    if (isNaN(xValue)) errorsStr += "Введите X\n";

    if (yInputValue.trim() === "") {
        errorsStr += "Введите Y\n";
    } else if (!/^-?\d*[.,]?\d+$/.test(yInputValue.replace(',', '.'))) {
        errorsStr += "Y должен быть числом\n";
    } else {
        const yValue = parseFloat(yInputValue.replace(',', '.'));
        if (isNaN(yValue)) errorsStr += "Y должен быть числом\n";
        else if (checkY(yValue)) errorsStr += "Y должен быть в диапазоне [-5, 3]\n";
    }

    if (isNaN(rValue)) errorsStr += "Введите R\n";
    else if (checkR(rValue)) errorsStr += "R введён неверно\n";

    if (errorsStr) {
        alert(errorsStr);
        return;
    }

    const url = `http://helios.cs.ifmo.ru:13010/fcgi-bin/Server.jar?x=${encodeURIComponent(xValue)}&y=${encodeURIComponent(yInputValue)}&r=${encodeURIComponent(rValue)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Accept': 'application/json'}
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            alert('Ошибка сервера: ' + data.error);
        } else {
            addTableRow(data, xValue, parseFloat(yInputValue.replace(',', '.')), rValue);
        }
    } catch (error) {
        console.error('Request failed:', error);
        alert('Ошибка соединения: ' + error.message);
    }
}

function checkY(y){
    return y < -5 || y > 3;
}

function checkR(r){
    return r < 1 || r > 3;
}
document.querySelectorAll(".r-button").forEach(button => {
    button.addEventListener("click", function() {
        const r = this.getAttribute("data-value");
        document.getElementById("rValue").value = r;

        document.querySelectorAll(".r-button").forEach(btn => {
            btn.classList.remove("selected");
        });
        this.classList.add("selected");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector(".r-button")) {
        document.querySelector(".r-button").click();
    }
});

function formatNumber(num) {
    return Number.isInteger(num) ? num : num.toFixed(2);
}

function addTableRow(data, x, y, r){
    console.log("Creating new row")
    let tbody = document.querySelector("tbody");
    let newRow = document.createElement("tr");

    let xCell = newRow.insertCell();
    let xValue = document.createTextNode(x);
    xCell.appendChild(xValue);

    let yCell = newRow.insertCell();
    let yValue = document.createTextNode(formatNumber(y));
    yCell.appendChild(yValue);

    let rCell = newRow.insertCell();
    let rValue = document.createTextNode(r)
    rCell.appendChild(rValue);

    let currentTimeCell = newRow.insertCell();
    let currentTimeValue = document.createTextNode(new Date().toLocaleTimeString())
    currentTimeCell.appendChild(currentTimeValue);

    let executionTimeCell = newRow.insertCell();
    let executionTimeValue = document.createTextNode(data.workTime + "ms");
    executionTimeCell.appendChild(executionTimeValue);

    let resultCell = newRow.insertCell();
    let resultValue = document.createTextNode(data.result);
    resultCell.appendChild(resultValue);

    tbody.prepend(newRow);
}

function addErrorRow (data){
    let newRow = document.createElement("tr");

    let errorCell = newRow.insertCell();
    let errorMsg = document.createTextNode(data.error);
    errorCell.appendChild(errorMsg);
}

