var Hour = React.createClass({

  filterByHour(){
    var thisHourAppts = [];
    this.props.thisWeekAppts.map((appt) =>{
      if(appt.start_time.substr(11,2) == this.props.hourName){
        thisHourAppts.push(appt);
      }
    });
    return thisHourAppts;
  },
  formatHour(hour){
    var formattedHour;
    if (hour.toString().length > 1){
      formattedHour = hour + ":00"
    } else {
      formattedHour = "0" + hour + ":00"
    }
    return formattedHour;
  },

  createNewAppointment(day) {
    hour = this.formatHour(this.props.hourName);
    this.props.createNewAppointment(day, hour)
  },

  render() {
    // make 7 days
    var days = [];
    var day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (var i = 0; i < 7; i++){
      days.push(
        <div className="slot column" key={day_names[i]}>
          <Day hourName={this.props.hourName}
            dayDate={this.props.dateRange[i].substr(0,10)}
            thisHourAppts={this.filterByHour()}
            displayDetails={this.props.displayDetails}
            sitters={this.props.sitters}
            createNewAppointment={this.createNewAppointment}
             />
        </div>
      );
    }

    return (

      <div className="row small-up-8">
        <div className="column slot">
          {this.props.hourName}
        </div>
        {days}
      </div>
    )
  }
});
