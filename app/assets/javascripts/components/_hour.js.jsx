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

  handleClick(day) {
    console.log("clicked a div on day: "+ day  +" at " + this.props.hourName);
  },

  displayDetails(id){
    console.log("clicked appointment of id: " + id);
  },

  render() {
    // make 7 days
    var days = [];
    var day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (var i = 0; i < 7; i++){
      days.push(
        <div className="slot column" key={day_names[i]} onClick={this.handleClick.bind(this, this.props.dateRange[i].substr(0,10))}>
          <Day hourName={this.props.hourName}
            dayDate={this.props.dateRange[i].substr(0,10)}
            thisHourAppts={this.filterByHour()}
            displayDetails={this.displayDetails}
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
