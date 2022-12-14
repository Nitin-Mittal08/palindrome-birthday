
function reverseStr(str){
    return str.split('').reverse().join('');
  }

  function isPalindrome(str){
    const reverse = reverseStr(str);
    return str===reverse;
  }

  function convertDateToString(date){
    var dateStr = {day:"",month:"",year:""};
    if(date.day<10){
      dateStr.day = '0' + date.day;
    }
    else{
      dateStr.day = date.day.toString();
    }

    if(date.month<10){
      dateStr.month = '0' + date.month;
    }else{
      dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
  }

  function returnAllDateFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy = dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd = dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy = dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)+ dateStr.month+dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

  function checkPalindromeForALlDateFormats(date){
    var palindromeList  = returnAllDateFormats(date);

    var flag = false;

    for(let i = 0;i < palindromeList.length;i++){
      if(isPalindrome(palindromeList[i])){
        flag = true;
        break;
      }

    }
    return flag;
  }

  function checkLeapYear(year){
    if(year%400==0){
      return true;
    }

    if(year%100==0){
      return false;
    }

    if(year%4==0){
      return true;

    }

    return false;
  }

  function getNextDate(date){
    var day = date.day +1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31,30,31,30,31,31,30,31,30,31];

    if(month===2){
      if(checkLeapYear(year)){
        if(day>29){
          day = 1;
          month++;
        }
        }else{
          if(day>28){
            day = 1;
            month++;
          }

      }
    }else{
      if(day>daysInMonth[month-1]){
        day = 1;
        month++;
      }
    }

    if(month>12){
      month = 1;
      year++;
    }

    return{
      day:day,
      month:month,
      year:year
    }
  }

  function nextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
      ctr++;
      if(checkPalindromeForALlDateFormats(nextDate)){
        break;

      }
      nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate]

  }

  // function inputChangeHandler(event){
  //   return event.target.value;
  // }

const inputDate = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-btn");
const outputEl = document.querySelector("#output");

  function clickHandler(){
    //console.log("clicked");
    var bdayStr = inputDate.value;

    if(bdayStr!==''){
      var listOfDate = bdayStr.split('-');
      var date = {
        day: Number(listOfDate[2]),
        month:Number(listOfDate[1]),
        year:Number(listOfDate[0])
      }

      var isPalindrome = checkPalindromeForALlDateFormats(date);

      if(isPalindrome){
        outputEl.innerText =  "Yay! your birthday is a palindrome";
      }
      else{
        var [ctr, nextDate] = nextPalindromeDate(date);
        outputEl.innerText = "The next palindrome date is "+ nextDate.day+"-"+nextDate.month+"-"+nextDate.year+" , you missed it by "+ctr+ " days";
      }
    }

  }

showBtn.addEventListener("click", clickHandler);
