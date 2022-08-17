addEventListener('load', (event) => {

    input_clear();
    let d = document.getElementById("element");
    for(let i = 0; i < d.childNodes.length; i++){
        let c = d.childNodes[i];
        c.addEventListener("click", function(){ calculator(c.innerHTML); })
    }

});
document.getElementById("clear").addEventListener("click", input_clear);
function input_clear(){

    document.getElementById('display').value = '';
    document.getElementById('err_msg').innerHTML = '';

}

var operand1 = '', operator = '', operand2 = '';

function calculator(val){

    let screen   = document.getElementById('display');
    let err_msg  = document.getElementById('err_msg');
    let fir,sec, res, rval = parseInt(val);

    try{
        if(isNaN(rval) && screen.value === '')
          throw "operator can not be placed first without operand";
    }
    catch(err){
        err_msg.innerHTML = err;
        screen.innerHTML = '';
    }
    finally{
        if(isNaN(rval)){
            if(operand1 !== ''){
                if(operator === ''){
                    if(val === '.'){
                        if(operand2 === '') operand1 += val;
                        else operand2 += val;
                        screen.value += val;
                    }
                    else{
                        operator = val;
                        screen.value += val;    
                    }
                }
                else{
                    
                    fir = parseInt(operand1);
                    sec = parseInt(operand2);
                    res = 0;     

                    try{
                        if(fir == NaN || sec == NaN) throw "All operand must be number";
                    }
                    catch(err){
                        document.getElementById('err_msg').innerHTML = err;
                        document.getElementById('display').innerHTML = '';
                    }
                    finally{

                        switch(operator){
                            case '+': res = fir +  sec; break;
                            case '-': res = fir -  sec; break;
                            case '*': res = fir *  sec; break;
                            case '^': res = fir ** sec; break;
                            case '/':
                                try{
                                    if(sec == 0 || (fir == 0 && sec == 0)) 
                                    throw "it will be undefined";
                                }
                                catch(err){

                                    err_msg.innerHTML = err;
                                    screen.innerHTML =  '';
                                }
                                finally{
                                    res = fir/sec;
                                }
                                break;
                            default: res = 0;
                        }

                        operator = val;
                        operand1 = res;
                        operand2 = '';
                        screen.value = res + val;  
                    }
                }
            }
            else err_msg.innerHTML = "error";
        }
        else {
            if((operator === '') && (operand2 === '')){
                  operand1 += val;
                  screen.value += val;
             }
             else if((operator !== '') && (operand1 !== '')){
                  operand2 += val;
                  screen.value += val;
             }
        }   
    }
}