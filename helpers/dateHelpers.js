export const getTodayDate = () => {
    
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    
    return today;
}

export const getTodaysDateInSlashFormat = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  return today;
}



export const getDateOfAddedOrSubscractedDays = (date, addedOrSubscracted, noOfDays) => {
  let selected_date = new Date(date);
  
  if(addedOrSubscracted == "added"){
    selected_date.setDate(selected_date.getDate()+noOfDays);
  }else{
    selected_date.setDate(selected_date.getDate()-noOfDays);
  }
  

  const dd = String(selected_date.getDate()).padStart(2, '0');
  const mm = String(selected_date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = selected_date.getFullYear();

  selected_date = yyyy + '-' + mm + '-' + dd;
  
  return selected_date;
}

export const getDayNumberOfWeek = (date, dayNo) => {
    
    const day = date.getDay() || 7;  
    // if( day !== 1 ) 
        date.setHours(-24 * (day - dayNo)); 
    
    return date.getDate();
}

export const getDateOfGivenCurrentDateAndDayNo = (date, dayNo) => {
    
    const day = date.getDay() || 7;  
    // if( day !== 1 ) 
        date.setHours(-24 * (day - dayNo)); 

    return date;
  }

export const getDayName = date => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(date);
    return dayName = days[d.getDay()];
  }

export const getMonthName = date => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const d = new Date(date);
    return monthNames[d.getMonth()];
}

export const getDateFull = date => {
    let today = new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    
    return today;
}

export const getDateFullPretty = date => {
  let today = new Date(date);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  
  return today;
}

export const getWeekData = date => {
    const weekObj = {};

    let dayNo = "";
    let dayName = "";
    let monthName = "";
    let dateInLoop = "";
    let dateFull = "";
    for (let i = 1; i <= 7; i++) {
      
      dateInLoop = getDateOfGivenCurrentDateAndDayNo(new Date(date), i);
      // console.log(i);
      dayNo = getDayNumberOfWeek(new Date(date), i);
      // console.log(dayNo);
      
      // console.log(dateInLoop);
      dayName = getDayName(dateInLoop);
      monthName = getMonthName(dateInLoop);
      dateFull = getDateFull(dateInLoop);


      dayObj = {
        'dayNo': dayNo,
        'dayName': dayName,
        'monthName': monthName,
        'dateFull': dateFull
      };

      // console.log(dayObj);

      weekObj[i] = dayObj;
    }


    return weekObj;
}