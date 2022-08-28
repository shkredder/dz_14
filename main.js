const form = document.querySelector("#form");
const select = document.querySelector("#select");
const number = document.querySelector("#user_number");

const get_but = document.querySelector("#button_get");
const rndm_but = document.querySelector("#button_random");

const checking = () => {
    if (select.value === "") {
        get_but.setAttribute("disabled", "disabled");
    } else {
        get_but.removeAttribute("disabled");
        if (select.value === "date") {
            number.type = "text";
            number.setAttribute("pattern", "d{1,2}/d{1,2}");
            number.setAttribute("placeholder", "mm/dd");
        } else {
            number.type = "number";
            number.removeAttribute("pattern");
            number.removeAttribute("placeholder");
        }
    }
};

const inputProcessing = (event) => {
    event.preventDefault();
    let number_value = number.value;

    if (number_value === "") {
        number_value = 0;
    }
    result(number_value, select.value);
};

const result = (value, option) => {
    const XHR = new XMLHttpRequest();
    const url = `http://numbersapi.com/${value}/${option}`;
    const div = document.querySelector("wrapper");

    XHR.open("GET", url);
    XHR.send();
    XHR.onload = function () {
        if (document.querySelector("#result") !== null) {
            document.querySelector("#result").remove();
        }
        let fact = document.createElement("div");
        fact.setAttribute("id", "fact");
        fact.innerHTML = XHR.response;
        document.body.insertBefore(fact, div);
    };
};

const randomNumber = (event) => {
    event.preventDefault();
    result("random", select.value);
};

form.addEventListener("input", checking);
get_but.addEventListener("click", inputProcessing);
rndm_but.addEventListener("click", randomNumber);
