$(function() {


 let data = [];
 let num = 0;

 $("#addBar").click(function(){
  data[num] = [];
  data[num].push($("#size").val());
  data[num].push($("#color").val());
  data[num].push($("#name").val());
  data[num].push($("#colorLab").val());
  num++;
  $("#size").val("")
  $("#name").val("")
  return false;
  });

 $("#showBar").click(function(){
    for(let i = 0; i < data.length; i ++){
    var node = $("<div/>").appendTo("div#box");
    $(node).html(data[i][0]);
    }
    return false;
 });




function drawBarChart(genBar, barOpts, stuff3){

let chart = $("<div></div>");
$(chart).css("display", "grid");
$(chart).css("gridTemplateColumns", "repeat" + "(" + 25 +", " + 1 +"fr"+")");
$(chart).css("gridTemplateRows", "repeat" + "(" + 200 +", " + 1 +"fr"+")");


let help = 0;
let max = 0;
for(let i = 0; i < genBar.length; i++){
      help = parseInt(genBar[i][0],10);
      if(help > max){
        max = help;
      }
}

//let max = Math.max.apply(null, help);


/*
let max = 0;

for(let i = 0; i < genBar.length; i++){
    if(genBar[i][0] > max){
      max = genBar[i][0];
  }
}
 alert(typeof max);
*/

let multiplier = (200 / max);
//row start col start row end col end
//grid-area: 2 / 3 / 4 / span 5;

let numCng = parseInt(barOpts.space,10);

if(barOpts.space == ""){
  numCng = 0;
}

let space = numCng;

    for(let i = 0; i < genBar.length; i++){

        if(i === 0){
        let bar = $("<div></div>");
        $(bar).css("gridArea", (201 - Math.trunc((genBar[i][0] * multiplier))) + " / " + (i+1) + " / " + 201 + " / " + (i+2) );
        $(bar).css("backgroundColor", genBar[i][1]);


        let derp = $("<div></div>");
        if(barOpts.posOfLabel == "bottom"){
        $(derp).css("gridArea", 190 + " / " + (i+1) + " / " + 201 + " / " + (i+2) );
        $(derp).html(genBar[i][0]);
        $(chart).append(bar);
        $(chart).append(derp);
       } else if(barOpts.posOfLabel == "middle"){
           $(derp).css("gridArea", 195 - (Math.trunc((genBar[i][0] * multiplier))/2)
            + " / " + (i+1) + " / " + (201 - (Math.trunc((genBar[i][0] * multiplier)))/2)  +  " / " + (i+2) );
           $(derp).html(genBar[i][0]);
           $(chart).append(bar);
           $(chart).append(derp);
         }
       else{ //top
           $(bar).html(genBar[i][0]); //automatically to top
           $(chart).append(bar);
         }

       } else if(i !== 0){
        let bar = $("<div></div>");
        $(bar).css("gridArea", (201 - Math.trunc((genBar[i][0] * multiplier))) + " / " + (i + 1 +  space) + " / " + 201 + " / " + (i + 2 + space) );
        $(bar).css("backgroundColor", genBar[i][1]);


        let derp = $("<div></div>");
        if(barOpts.posOfLabel == "bottom"){
        $(derp).css("gridArea", 190 + " / " + (i + 1 +  space) + " / " + 201 + " / " + (i + 2 +  space) );
        $(derp).html(genBar[i][0]);
        $(chart).append(bar);
        $(chart).append(derp);
       } else if(barOpts.posOfLabel == "middle"){
           $(derp).css("gridArea", 195 - (Math.trunc((genBar[i][0] * multiplier))/2)
            + " / " + (i + 1 +  space) + " / " + (201 - (Math.trunc((genBar[i][0] * multiplier)))/2)  +  " / " + (i + 1 +  space) );
           $(derp).html(genBar[i][0]);
           $(chart).append(bar);
           $(chart).append(derp);
         }
       else{ //top
           $(bar).html(genBar[i][0]); //automatically to top
           $(chart).append(bar);
         }
         space+= numCng;
       }

    }



//yAxis
let yAxis = $("<div></div>");
$(yAxis).css("height", barOpts.heightOf);
$(yAxis).css("width", barOpts.widthOf/10);
$(yAxis).css("display", "grid");



$(yAxis).css("gridTemplateColumns",2);
$(yAxis).css("gridTemplateRows", "repeat" + "(" + barOpts.yAxisInt +", " + 1 +"fr"+")");

let interval = max/barOpts.yAxisInt;

for(let i = 0; i < barOpts.yAxisInt; i++ ){
  let yAxisTicks = $("<div></div>");


  if(i === 0){
  $(yAxisTicks).text(Math.trunc(max)+"-");
  }
  else {
    $(yAxisTicks).text(Math.trunc(max - interval) + "-");
    max -= interval;
  }


  $(yAxis).append(yAxisTicks);
}




$(yAxis).css("backgroundColor", 'white');
$(yAxis).css("borderTop", 5 + 'px' + ' black ' + ' solid');
$(yAxis).css("borderLeft", 5 + 'px' + ' black ' + ' solid');
$(yAxis).css("borderBottom", 5 + 'px' + ' black ' + ' solid');
$(yAxis).css("float", "left");
$(stuff3).append(yAxis);


//chart title
let charTitle = $("<div></div>");
$(charTitle).css("width", barOpts.widthOf);
$(charTitle).html(barOpts.title);
$(charTitle).css("fontSize", (barOpts.fntSize + 'px'));
$(charTitle).css("color", barOpts.fntColor );
$(charTitle).css("display", "block");
$(charTitle).css("float", "top");
$(charTitle).css("textAlign", "center");
$(stuff3).prepend(charTitle);

//chart

$(chart).css("backgroundColor", 'white');
$(chart).css("border", 5 + 'px' + ' black ' + ' solid');
$(chart).css("height", barOpts.heightOf );
$(chart).css("width", barOpts.widthOf);
$(stuff3).append(chart);


//xAxis
let xAxis = $("<div></div>");
$(xAxis).css("height", barOpts.heightOf/10);
$(xAxis).css("width", barOpts.widthOf);


$(xAxis).css("gridTemplateColumns", genBar.length);
$(xAxis).css("gridTemplateRows", 1);


for(let i = 0; i < genBar.length; i++){
let xAxisLab = $("<div></div>");
$(xAxisLab).css("display", "inline")
$(xAxisLab).text(genBar[i][2]);
$(xAxisLab).css("backgroundColor", genBar[i][3]);
$(xAxis).append(xAxisLab);
}

$(xAxis).css("float", "right");
$(xAxis).css("backgroundColor", 'white');
$(xAxis).css("borderRight", 5 + 'px' + ' black ' + ' solid');
$(xAxis).css("borderLeft", 5 + 'px' + ' black ' + ' solid');
$(xAxis).css("borderBottom", 5 + 'px' + ' black ' + ' solid');
$(stuff3).append(xAxis);

}


    $("#makeChart").click(function(){
      function saveOpts(){
      let optionsObj = {

       heightOf : $("#height").val(),
       widthOf : $("#width").val(),
       posOfLabel : $("#pos").val(),
       title: $("#Title").val(),
       fntSize: $("#fntSize").val(),
       fntColor: $("#fntColor").val(),
       yAxisInt: $("#yAxisInterval").val(),
       colLab: $("#colorLab").val(),
       space: $("#spaceBtwn").val()
      }
      return optionsObj

      }

      let options = saveOpts();

       drawBarChart(data, options, $("#container"));
       return false;
    });

});
// drawBarChart(data, options, element);