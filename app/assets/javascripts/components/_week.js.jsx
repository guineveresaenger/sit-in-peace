var Week = React.createClass({
  getInitialState() {
    return {appointments: [],
      sitters: [],
      showDetails: false,
      currentAppointment: null,
      currentDay: '',
      currentHour:'',
    }
  },
  componentWillMount() {
    var appointments = $.getJSON('/api/v1/appointments.json');
    var sitters = $.getJSON('/api/v1/sitters.json');

    $.when( appointments, sitters ).done(( appointments, sitters ) => {
      this.setState({
        appointments: appointments[0],
        sitters: sitters[0],
      })
    });
  },

  handleSubmit(appointment){
    var newState = this.state.appointments.concat(appointment);
    this.setState({ appointments: newState, showDetails: false });
    console.log("appointment submitted!");
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

  createNewAppointment(day, hour){
    console.log("clicked on a div:" + day + hour);
    if (this.state.showDetails){
      this.setState({
        showDetails: false,
        currentAppointment: null,
      })
    } else {
      console.log(day);
      console.log(hour);
      this.setState({
        currentDay: day,
        currentHour: hour,
        showDetails: true,
      })
    }
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

  // filterBySitter(appointments) {
  //   var thisSitterAppointments = [];
  //   appointments.map((appt) => {
  //     for(var i = 0; i < appointments.length; i++) {
  //       if(appt.sitter_id == 8) {
  //         thisSitterAppointments.push(appt);
  //       }
  //     }
  //   });
  //   return thisSitterAppointments;
  // },

  getDetails(id){
    var thisAppointment = this.state.appointments.find((appointment) => {
      return appointment.id == id;
    });
    console.log("Here's this appointment: " + thisAppointment);
    // return thisAppointment;
    this.setState({
      currentAppointment: thisAppointment,
      showDetails: true,
    })
  },

  onButtonClick() {
    if (this.state.showDetails){
      this.setState({
        showDetails: false,
      })
    } else {
      this.setState({
        showDetails: true,
      })
    }
  },

  messageSitter(sitter_id, appointment){
    var phone = this.findSitterByID(sitter_id).phone;

    // $.ajax({
    //   url: '/messages/initiate',
    //   type: 'POST',
    //   data: {
    //     description: appointment.description,
    //     phone: phone,
    //     start_time: appointment.start_time,
    //     appointment_id: appointment.id,
    //   },
    //
    //   success: (response) => {
    //     console.log("yay message sent!");
    //   }
    // })
    console.log("phone message sent");
  },

  findSitterByID(id) {
    return this.state.sitters.find((sitter) => {
      return sitter.id == id;
    });
  },

  render() {
    console.log(this.state.hour);
    console.log(this.state.day);

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
            sitters={this.state.sitters}
            createNewAppointment={this.createNewAppointment}
          />

        </div>
      );
    }
    return (
      <div>
        <button onClick={this.onButtonClick}>Add a new appointment!</button>

        { this.state.showDetails ?
          <AppointmentDetails appointment={ this.state.currentAppointment }
          handleEdit={ this.handleEdit }
          handleDelete={ this.handleDelete }
          handleSubmit={this.handleSubmit}
          sitters={ this.state.sitters }
          messageSitter={ this.messageSitter }
          currentDay={ this.state.currentDay }
          currentHour={ this.state.currentHour }
            /> : null}
        <WeekdayLabels dateRange={ this.props.dateRange }/>
        {hours}
      </div>
    )
  }
});
