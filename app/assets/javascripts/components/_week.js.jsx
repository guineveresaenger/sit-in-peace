var Week = React.createClass({
  getInitialState() {
    return {appointments: [],
      sitters: [],
      showDetails: false,
      currentAppointment: null,}
  },
  componentDidMount() {
    $.getJSON('/api/v1/appointments.json', (response) => {
      this.setState({
        appointments: response,
        showAddNew: false,

      })
    });
    $.getJSON('/api/v1/sitters.json'), (response) => {
      this.setState({
        sitters: response,
      })
    }
  },

  handleSubmit(appointment){
    var newState = this.state.appointments.concat(appointment);
    this.setState({ appointments: newState, showAddNew: false });
    console.log("submitted this appointment: " + appointment);
  },

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/appointments/${id}`,
      type: 'DELETE',
      success:() => {
        console.log("successfully removed item");
        this.removeAppointmentFromList(id);
      }
    });
  },

  handleEdit(appointment){
    console.log(appointment.id);
    $.ajax({
      url: `/api/v1/appointments/${appointment.id}`,
      type: 'PUT',
      data: {appointment: appointment},
      success: () => {
        this.updateAppointmentList(appointment);
      }
    });
  },
  removeAppointmentFromList(id) {
    var allAppointments = this.state.appointments.filter((appointment) =>{
      return appointment.id != id;
    });
    this.setState({appointments: allAppointments, showDetails: false});
  },

  updateAppointmentList(appointment) {
    var updatedAppointments = this.state.appointments.filter((appt) => {
      return appt.id != appointment.id
    });

    updatedAppointments.push(appointment);
    this.setState({appointments: updatedAppointments, showDetails: false})
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
      return appointment.id == id;
    });
    // return thisAppointment;
    this.setState({
      currentAppointment: thisAppointment,
      showDetails: true,
    })
  },

  onButtonClick() {
    if (this.state.showAddNew){
      this.setState({
        showAddNew: false,
      })
    } else {
      this.setState({
        showAddNew: true,
      })
    }
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


    return (
      <div>

        <button onClick={this.onButtonClick} className='button'>Add a new appointment</button>
        {this.state.showAddNew ? <NewAppointment handleSubmit={this.handleSubmit}/> : null}
        {this.state.showDetails ?
          <AppointmentDetails appointment={this.state.currentAppointment}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
            /> : null}
        <WeekdayLabels dateRange={this.props.dateRange}/>
        {hours}

      </div>
    )
  }
});
