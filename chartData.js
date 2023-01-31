function ChartData(url) {
    this.url = url;

}

ChartData.prototype.makeRequest = function() {
    return new Promise ((resolve, reject) => {
        fetch(this.url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                // console.log(xml);
                resolve(xml);
            });
    });
}

ChartData.prototype.takeData = function(xml) {
    return new Promise ((resolve, reject) => {
        const x = xml.getElementsByTagName("Record");
        this.dateDate = [];
        this.dataValue = [];
        for (let i = 0; i < x.length; i++) {
            this.dateDate[i] = x[i].getAttribute('Date');
            // this.dateDate[i] = i;
            this.dataValue[i] = parseFloat(x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue.replace(",", "."));
            // this.dataValue[i] = parseInt(x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue);
        }

        console.log(this.dateDate[30], " ", this.dataValue[30]);
        console.log(xml);
        resolve(this.dataValue);
    });
}

ChartData.prototype.drawChartGraph = function(dataValue) {

    console.log(dataValue[10]);
    let self = this;
    Highcharts.chart('chartContainer', {

        title: {
          text: 'Курс рубля к доллару',
          align: 'left'
        },
      
      
        xAxis: {
          accessibility: {
            data: self.dateDate
          }
        },
      
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
      
        // plotOptions: {
        //   series: {
        //     label: {
        //       connectorAllowed: false
        //     },
        //     pointStart: this.dateDate[0]
        //   }
        // },
      
        series: [{
          name: 'Курс рубля',
          data: self.dataValue
        }],
      
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      
      });
}


export {ChartData};