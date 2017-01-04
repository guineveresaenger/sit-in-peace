var AllAppointments = React.createClass ({
  getInitialState() {
    return {appointments: []}
  },
  componentDidMount() {
    $.getJSON('/api/v1/appointments.json', (response) => {
      this.setState({ appointments: response})
    });
  },
  render() {
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
