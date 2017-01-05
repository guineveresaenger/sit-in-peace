var NewAppointment = React.createClass({
  handleClick(){
    var date = this.refs.date.value;
    var hour = this.refs.hour.value;
    var description = this.refs.description.value;
    // TODO: customize input form so it allows only correctly formatted date
    // TODO: validate inputs in general

    // use Moment.js to format into a valid date
    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();
    console.log("this is the day: " + date);
    console.log("this is the hour: " + hour);
    console.log("this is the formatted time " + completeTime);
    $.ajax({
      url: '/api/v1/appointments',
      type: 'POST',
      data: {appointment: {start_time: completeTime, description: description}},
      success: (response) => {
        console.log("yay it worked!", response);
      }
    })
  },
  render() {
    return (
      <div>
        Put the new item form here.
        <input type='date' ref='date' placeholder='Enter the day of the appointment' />
        <input ref='hour' placeholder='00:00' />
        <input ref='description' placeholder='Enter the description of the appointment' />
        <button onClick={this.handleClick}>
          Submit
        </button>
      </div>
    )
  }
});
