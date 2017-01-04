var Hour = React.createClass({

  filterByHour(){
    var thisHourAppts = [];
    this.props.thisWeekAppts.map((appt) =>{
      if(appt.start_time.substr(11,2) == this.props.hourName){
        thisHourAppts.push(appt);
        console.log(appt);
        console.log("hour: " + this.props.hourName);
      }
    });
    return thisHourAppts;
  },

  render() {
    // make 7 days
    var days = [];
    var day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (var i = 0; i < 7; i++){
      days.push(
        <div className="slot column" key={day_names[i]}>
          <Day hourName={this.props.hourName}
            dayDate={this.props.dateRange[i]}
            thisHourAppts={this.filterByHour()}
             />

        </div>
      );
    }
    var appts = this.props.thisWeekAppts.map((appt) =>{
      return (
        <div key={appt.id}>
          <h5>{appt.start_time}</h5>
          <p>{appt.description}</p>
        </div>
      )

    });
    return (
      <div className="row small-up-7">
        <p>{this.props.hourName}</p>

        {days}

      </div>
    )
  }
});
