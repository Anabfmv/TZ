Date.dateAdd = function(currentDate, value, timeUnit) {
    timeUnit = timeUnit.toLowerCase();
    var multiplyBy = { w:604800000,
                      d:86400000,
                      h:3600000,
                      m:60000,
                      s:1000 };
    var updatedDate = new Date(currentDate.getTime() + multiplyBy[timeUnit] * value);
    return updatedDate;
};

var Calendar = function(model, options, date){
  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventTargetWholeDay: false,
    ModelChange: model,
    };
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

    model?this.Model=model:this.Model={};
    this.Today = new Date();

    this.Selected = this.Today
    this.Today.Month = this.Today.getMonth();
    this.Today.Year = this.Today.getFullYear();
    if(date){this.Selected = date}
    this.Selected.Month = this.Selected.getMonth();
    this.Selected.Year = this.Selected.getFullYear();

    this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster, needNotifications){
  function GetSettingForEvent(date, title, days)
  {
    var key = {Date:date, Title:title, Days:days};
    var value = JSON.parse(localStorage.getItem(JSON.stringify(key)));
    return value==true;
  }
  function SetSettingForEvent(date, title, days, value)
  {
    var key = {Date:date, Title:title, Days:days};
    localStorage.setItem(JSON.stringify(key), value);
  }
  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
          var rwd = document.createElement('div');
          rwd.className += " cld-rwd cld-nav";
          rwd.addEventListener('click', function(){createCalendar(calendar, element, -1, false);} );
          rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
          datetime.appendChild(rwd);
      }
      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
          var fwd = document.createElement('div');
          fwd.className += " cld-fwd cld-nav";
          fwd.addEventListener('click', function(){createCalendar(calendar, element, 1, false);} );
          fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
          datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
          document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
          document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }
  function getWeekDay(date) {
      var days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      return days[date.getDay()];
  }
  function AddDays(needNotifications){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";

    if(needNotifications)
    {
      function SendNotificationIfNeeded(model, days)
      {
        if(GetSettingForEvent(model.Date.getTime(), model.Title, days))
        {
          var currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          var offsetedDate = Date.dateAdd(model.Date,- days + 1,"d");
          if(offsetedDate.getTime()==currentDate.getTime()){   
                showNotification(model.Title,
                model.Date.toLocaleString("Ru",{year: 'numeric',month: 'long',day: 'numeric'})+ 
                " Через: " + days + " дня(ей)!");
          }
        }
      }
      for(var i = 0; i <  calendar.Model.length; i++){
        SendNotificationIfNeeded(calendar.Model[i],3);
        SendNotificationIfNeeded(calendar.Model[i],7);
        SendNotificationIfNeeded(calendar.Model[i],14);
      }
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
        var currentDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        var day = document.createElement('li');
        day.className += "cld-day currMonth";
        var number = DayNumber(i+1);
        number.innerHTML+=" ("+getWeekDay(currentDate)+")";
        day.appendChild(number);
      // Check Date against Event Dates
      function buttonHandler(button, days){
        var value = GetSettingForEvent(this.Date.getTime(), this.Title, days);
        if(value){
          button.className = button.className.replace(" title-button-active", "");
        } else {
          button.className +=" title-button-active";
        }
        SetSettingForEvent(this.Date.getTime(), this.Title, days, !value);
      }
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        if(evDate.getTime() == toDate.getTime()){
          number.className += " eventday";
          var title = document.createElement('div');
          var titleText = document.createElement("p");
          title.className += "cld-title";
          titleText.className += "cld-title";
          titleText.innerHTML = calendar.Model[n].Title;
          var button3day = document.createElement("p");
          button3day.className +="cld-title-button";
          button3day.innerHTML = "3";
          button3day.addEventListener("click", buttonHandler.bind(calendar.Model[n],button3day, 3));
          var button7day = document.createElement("p");
          button7day.innerHTML = "7";
          button7day.className +="cld-title-button";
          button7day.addEventListener("click", buttonHandler.bind(calendar.Model[n], button7day, 7));
          var button14day = document.createElement("p");
          button14day.innerHTML = "14";
          button14day.className +="cld-title-button";
          button14day.addEventListener("click", buttonHandler.bind(calendar.Model[n],button14day, 14));
          if(GetSettingForEvent(evDate.getTime(),calendar.Model[n].Title,3))
          {
            button3day.className +=" title-button-active";
          }
          if(GetSettingForEvent(evDate.getTime(),calendar.Model[n].Title,7))
          {
            button7day.className +=" title-button-active";
          }
          if(GetSettingForEvent(evDate.getTime(),calendar.Model[n].Title,14))
          {
            button14day.className +=" title-button-active";
          }
          title.appendChild(titleText);
          title.appendChild(button3day);
          title.appendChild(button7day);
          title.appendChild(button14day);
          day.appendChild(title);
        }
      }
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  
 if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' &&
	    typeof calendar.Options[key] != 'object' && 
	    calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddDays(needNotifications);
}

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el, undefined, true);
}

