var Week = React.createClass({
  getInitialState() {
    return {appointments: []}
  },
  componentDidMount() {
    $.getJSON('/api/v1/appointments.json', (response) => {
      console.log(response[0].id);
      this.setState({ appointments: response})
    });
  },

  filterByWeek() {
    var range = this.props.dateRange;
    var thisWeekAppts = []; this.state.appointments.map((appt) => {
      for(var i = 0; i < range.length; i++){
        if(appt.start_time.substr(0,10) == range[i].substr(0,10)){
          thisWeekAppts.push(appt);
        } else {
        }
      }


    });
    console.log(thisWeekAppts);
    return thisWeekAppts;
  },


  render() {
    // make 24 table rows!
    var hours = [];
    for (var i = 0; i < 24; i++){
      hours.push(
        <div className="hour" key={i}>
          <Hour hourName={i}
            startOfWeek={this.props.startOfWeek}
            dateRange={this.props.dateRange}
            />

        </div>
      );
    }
    var appts = this.filterByWeek().map((appt) => {
      return (
        <div key={appt.id}>
          <h3>{appt.start_time}</h3>
          <p>{appt.description}</p>
        </div>
      )
    });
    return (
      <div>
        <p>
          {this.props.start_of_week}
        </p>

        {hours}
        Hello
        {appts}


      </div>
    )
  }
});
