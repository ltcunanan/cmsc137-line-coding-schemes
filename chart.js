
function checkInput(){
    var ctx = document.getElementById("line-chart");
    var x = document.getElementById("input").value;
    var c = document.getElementById("choices");
    var choice = c.options[c.selectedIndex].text;
    console.log(choice);

    var binary = [];
    var labelsX = [];
    if(choice == "UNIPOLAR"){
        for(var i = 0; i < x.length; i++){
            //console.log(x[i]);
            binary.push(x[i]);
        }
    }
    else if(choice == "POLAR-NRZ"){
        for(var i = 0; i < x.length; i++){
            //do stuff before pushing
            if(x[i] == 0){
                binary.push(-1);

            }
            else{
                binary.push(x[i]);
            }
        }
    }
    else if(choice == "POLAR-RZ"){
        for(var i = 0; i < x.length; i++){
            //do stuff before pushing
            if(x[i] == 0){
                binary.push(-1);
                binary.push(0);

            }
            else{
                binary.push(x[i]);
                binary.push(0);
            }
        }

    }
    else if(choice == "POLAR-BIPHASE"){
        for(var i = 0; i < x.length; i++){
            //do stuff before pushing
            if(x[i] == 0){
                binary.push(1);
                binary.push(-1);
            }
            else if(x[i] == 1){
                binary.push(-1);
                binary.push(1);
            }
        }
    }
    else if(choice == "BIPOLAR"){
        for(var i = 0, flag = 0; i < x.length; i++){
            //do stuff before pushing
            if(x[i] == 1){
                if(flag == 0){
                    binary.push(1);
                    flag = 1;
                }
                else{
                    binary.push(-1);
                    flag = 0;
                }
            }
            else{
                binary.push(x[i]);
            }
        }
    }
    else if(choice == "MULTILEVEL-2B1Q"){
        for(var i = 0, flag = 0; i < x.length; ){ //
            //flag = 0 (positive or start), flag = 1 (negative)
            if(x[i] == 1){
                if(x[i+1] == 1){ //11
                    if(flag == 0){ //prev positive
                        binary.push(-3);
                        flag = 1;
                    }
                    else{ //prev negative
                        binary.push(3);
                        flag = 0;
                    }
                }
                else{ //10
                    if(flag == 0){ //prev positive
                        binary.push(-1);
                        flag = 1;
                    }
                    else{ //prev negative
                        binary.push(1);
                        flag = 0;
                    }
                }
            }
            else if(x[i] == 0){
                if(x[i+1] == 1){ //01
                    if(flag == 0){ //prev positive
                        binary.push(3);
                        flag = 0;
                    }
                    else{ //prev negative
                        binary.push(-3);
                        flag = 1;
                    }
                }
                else{ //00
                    if(flag == 0){ //prev positive
                        binary.push(1);
                        flag = 0;
                    }
                    else{ //prev negative
                        binary.push(-1);
                        flag = 1;
                    }
                }
                
            }
            i = i+2;
        }
    }

    binary.push(binary[binary.length-1]); //duplicate for output in map
    //binary.push(0);

    console.log(binary);

    var int = binary.length-1; // minus 1, duplicated not included.

    for(var x = 0; x < int+1; x++){
        labelsX.push(" ");
    }

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsX, //["0", "5", "10", "15", "20", "25"], //labels in bottom (array)
            datasets: [
                {
                    steppedLine: true,
                    label: choice,
                    data: binary,//[1,0,1,0,1,0,0], //additional duplicate in the end para labels ===data
                    fill: false,
                    borderColor: "#f20030",
                    borderDash: [5, 5],
                    backgroundColor: "#e755ba",
                    pointBackgroundColor: "#55bae7",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                }
            ]
        },
        options: {
            scales:{
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin:0,
                        suggestedMax:2
                    }
                }]
            }
        }
    });

}