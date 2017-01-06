var Week = React.createClass({
  getInitialState() {
    return {appointments: []}
  },
  componentDidMount() {
    $.getJSON('/api/v1/appointments.json', (response) => {
      this.setState({ appointments: response})
    });
  },

  handleSubmit(appointment){
    var newState = this.state.appointments.concat(appointment);
    this.setState({ appointments: newState });
    console.log("submitted this appointment: " + appointment);
  },

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/appointments/${id}`,
      type: 'DELETE',
      success:() => {
        console.log("successfully removed item");
        this.removeAppointmentFromDatabase(id);
      }
    });
  },

  removeAppointmentFromDatabase(id) {
    var allAppointments = this.state.appointments.filter((appointment) =>{
      return appointment.id != id;
    });
    this.setState({appointments: allAppointments});
  },

  filterByWeek() {
    var range = this.props.dateRange;
    // iterate over appts and see if they match the dates in our range
    var thisWeekAppts = []; this.state.appointments.map((appt) => {
      for(var i = 0; i < range.length; i++){
        if(appt.start_time.substr(0,10) == range[i].substr(0,10)){
          thisWeekAppts.push(appt);

        }
      }
    });
    return thisWeekAppts;
  },

  getDetails(id){
    var thisAppointment = this.state.appointments.find((appointment) =>{
      return appointment.id = id;
    });
    console.log('getting details for id: ' + thisAppointment.id);
  },

  render() {
    // make 24 table rows!
    var hours = [];
    for (var i = 0; i < 24; i++){
      hours.push(
        <div className="hour" key={i}>
          <Hour
            hourName={i}
            startOfWeek={this.props.startOfWeek}
            dateRange={this.props.dateRange}
            thisWeekAppts={this.filterByWeek()}
            displayDetails={this.getDetails}
          />

        </div>
      );
    }
    var appts = this.filterByWeek().map((appt) => {
      return (
        <div key={appt.id}>
          <h3>{appt.start_time}</h3>
          <p>{appt.description}</p>
          <button onClick={this.handleDelete.bind(this, appt.id)}>Delete this appointment</button>
        </div>
      )
    });
    
    return (
      <div>
        Add a new appointment:
        <NewAppointment handleSubmit={this.handleSubmit}/>
        <WeekdayLabels dateRange={this.props.dateRange}/>
        {hours}
        {appts}

      </div>
    )
  }
});
