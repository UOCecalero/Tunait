/*  Declaración de funciones
 */

 function addEventListenerList(list, event, fn) {

    for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    } 

    return list;
}

function toSingle(digit){
                  if(digit > 9){
                      var tmp = digit.toString();
                      var d1 = parseInt(tmp.charAt(0));
                      var d2 = parseInt(tmp.charAt(1));
                      return (d1 + d2); 
                  } else {
                      return digit;
                  }
                }


function isValid(ccNum, charCount){
                      var double = true;
                      var numArr = [];
                      var sumTotal = 0;
                      for(i=0; i<charCount; i++){
                          var digit = parseInt(ccNum.charAt(i));

                          if(double){
                              digit = digit * 2;
                              digit = toSingle(digit);
                              double = false;
                          } else {
                              double = true;
                          }
                          numArr.push(digit);
                      }


                      for(i=0; i<numArr.length; i++){
                          sumTotal += numArr[i];
                      }
                      var diff = eval(sumTotal % 10);
                      console.log(diff);
                      console.log(diff == "0");
                      return (diff == "0");
                }


function validate(num){
                
                num = String(num);
                var charCount = num.length;
                
                switch(charCount){
                
                case 1: nnum = Number(num)
                
                    if (nnum !== 4 && nnum !== 5 && nnum !== 3 ) { return 0;
                  } else { return "ACCEPTED"; }  
                
                break;
                
                case 2: nnum = Number(num);
                
                  if ( (39 < nnum && nnum < 50) || (50 < nnum && nnum < 56) || (33 < nnum && nnum < 38) ) { return "ACCEPTED";
                  } else { return 0; }
                
                break;
                
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:

                        snum = num.split("");
                      if ( (snum[0] === "4") && isValid(num, charCount)) { return "VISA";}
                      else if ( snum[0] === "5" ) {
                        if ( ( snum[1] === "1" || 
                                snum[1] === "2" || 
                            snum[1] === "3" || 
                            snum[1] === "4" || 
                            snum[1] === "5"  ) && isValid(num, charCount)) { return "MASTERCARD"; } else {return 0; } 
                      }
                      else if ( snum[0] === "3" ) {
                        if ((snum[1] === "4" || 
                                snum[1] === "5" || 
                            snum[1] === "6" || 
                            snum[1] === "7" ) && isValid(num, charCount)){ return "AMEX"; }  else { return 0; }
                      } 
                      
                      else { return 0; }
                 
                 break;
                
                case 16 : 

                        snum = num.split("");
                      if ( (snum[0] === "4" ) && isValid(num, charCount) ) { return "VISA";}
                      else if ( snum[0] === "5" ) {
                        if ((snum[1] === "1" || 
                                snum[1] === "2" || 
                            snum[1] === "3" || 
                            snum[1] === "4" || 
                            snum[1] === "5" ) && isValid(num, charCount) ) { return "MASTERCARD";}  else {return 0; }
                      } else { invalidnumber(); }
                  
                break;

                default: return 0;
                }

            }

function formatTime(ini,fin){

        ini = t2d(ini);
        fin = t2d(fin);

        var a = ini.toString();
            a = a.split(" ");
            a[4] = a[4].slice(0,5);
        var b = fin.toString();
            b = b.split(" ");
            b[4] = b[4].slice(0,5);


        var formated = a[0] +" "+ a[2] +" "+ a[1] +" "+ a[4] +" - "+ b[4];



        return formated;

    }

function t2d(timestamp){

        var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
        var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
        return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);

    }

function getAge(birthdate){

  var today = Date.now();
  var dob = new Date(birthdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$1/$2"));
  var age = today.getFullYear() - birthdate.getFullYear(); 

  return age;


}





