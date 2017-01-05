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
