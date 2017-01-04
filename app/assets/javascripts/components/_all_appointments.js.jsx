var AllAppointments = React.createClass ({
  getInitialState() {
    return {appointments: []}
  },
  componentDidMount() {
    $.getJSON('/api/v1/appointments.json', (response) => {
      console.log(response[0].id);
      this.setState({ appointments: response})
    });
  },
  render() {
    var thisWeekAppts = [];
    var appts = this.state.appointments.map((appt) => {
      if(appt.start_time.substr(0,10) == "2017-01-03"){
        console.log("this works");
      } else {
        console.log("this doesn't work");
      }
    });







    var appts = this.state.appointments.map((appt) => {
      return (
        <div key={appt.id}>
          <h3>{appt.start_time}</h3>
          <p>{appt.description}</p>
        </div>
      )
    });
    return (
      <div>
        {appts}
      </div>
    )
  }

})
