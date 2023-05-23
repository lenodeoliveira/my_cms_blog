import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export let chartReference = null

export function createChart (data) {

  const chart = am4core.create("chartdiv", am4charts.PieChart);
  // Add data
  chart.data = data
  chart.radius = am4core.percent(70);
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "quantity";
  pieSeries.dataFields.category = "authors";
  pieSeries.tooltip.getFillFromObject = false;
  pieSeries.tooltip.background.fill = am4core.color("#fff");
  pieSeries.tooltip.label.fill = am4core.color("#000");
}

  
