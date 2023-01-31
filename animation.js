import {ChartData} from "./chartData.js";

function CurrensyForm() {
    this.input = document.querySelectorAll('.form-field__input');
    this.input_f = document.querySelectorAll('.test');
    this.input_lab = document.querySelectorAll('.form-field__label');
    this.calcButton = document.querySelectorAll('.calcButton');
}

CurrensyForm.prototype.initSettings = function() {
    // return new Promise ((resolve, reject) => {
    //     this.resolve = resolve;
        this.input.forEach((item, pos) => {
            item.addEventListener('focus', () => this.checking(pos));
            item.addEventListener('blur', () => this.check_out(pos));
        });
        this.calcButton[0].addEventListener('click', () => {
            this.takeData().then(() => {
                console.log("helo raf");

                let chartData = new ChartData(form.url.toString());
                chartData.makeRequest()
                    .then(xml => chartData.takeData(xml))
                    .then(dataValue => chartData.drawChartGraph(dataValue));

            });
            // resolve();
        });
        this.input[1].addEventListener('keypress', (event) => {this.clickEnter(event)});
    // });
}

CurrensyForm.prototype.clickEnter = function(event) {
    if (event.key === "Enter") {
        // event.preventDefault();
        this.takeData();
    }
}

CurrensyForm.prototype.checking = function(x) {
    this.input_f[x].classList.add("form-field__active");
    this.input_lab[x].classList.add("label_active");
}

CurrensyForm.prototype.check_out = function(y) {

    if (this.input[y].value == '') {
        console.log("hello");
        this.input_f[y].classList.remove("form-field__active");
        this.input_lab[y].classList.remove("label_active");
    } else {
        this.input_f[y].classList.remove("form-field__active");
        this.input_lab[y].classList.remove("label_active");
        this.input_lab[y].classList.add("label_active_filled");
    };
}

CurrensyForm.prototype.takeData = function(x) {
    return new Promise ((resolve, reject) => {
        console.log(this.input[0].value, " ", this.input[1].value);
        let date = [this.input[0].value, this.input[1].value];
        this.url = new URL("http://www.cbr.ru/scripts/XML_dynamic.asp");
        this.url.searchParams.set('date_req1', date[0]);
        this.url.searchParams.append('date_req2', date[1]);
        this.url.searchParams.append('VAL_NM_RQ', "R01235");
        // this.resolve();
        // console.log(this.url.toString());
        resolve();
    });

}

let form = new CurrensyForm();
form.initSettings();

// form.initSettings().then(() => {

//     console.log(form.url.toString());
//     let chartData = new ChartData(form.url.toString());

//     // chartData.makeRequest().then(xml => {
//     //     chartData.takeData(xml).then(dataValue3 => {
//     //         console.log(dataValue3);
//     //         chartData.drawChartGraph(dataValue3);
//     //     })
//     // });
    

//     chartData.makeRequest()
//         .then(xml => chartData.takeData(xml))
//         .then(dataValue => chartData.drawChartGraph(dataValue));

  
// });