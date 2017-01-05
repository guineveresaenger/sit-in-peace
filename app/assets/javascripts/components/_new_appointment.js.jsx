var NewAppointment = React.createClass({
  handleClick(){
    var date = this.refs.date.value;
    var hour = this.refs.hour.value;

    //now use Moment to format this shit into a valid date...grrr...UGH

    var completeTime = moment(date + "T" + hour).toDate().toJSON();
    console.log("this is the Time object I hope: " + completeTime);

    var description = this.refs.description.value;

    console.log('the date is ' + date + ' and the time is '+ hour + ' and the description is ' + description );
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
