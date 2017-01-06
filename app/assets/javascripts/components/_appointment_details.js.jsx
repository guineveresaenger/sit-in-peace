var AppointmentDetails = React.createClass({
  // getInitialState() {
  //   return {
  //     appointment: this.props.appointment
  //   }
  // },

  handleEdit(id){
    console.log("update button clicked");
    var date = this.refs.date.value;
    var hour = this.refs.hour.value;
    var description = this.refs.description.value;

    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();
    //Keep the same id but update description and/or time
    var appointment = {
      id: this.props.appointment.id,
      start_time: completeTime,
      description: description,

    };
    this.props.handleEdit(appointment);

  },
  render() {
    var date = this.props.appointment.start_time.substr(0,10);
    var hour = this.props.appointment.start_time.substr(11,5);
    var description = this.props.appointment.description;
    return(
      <div>
        I am an appointment. You can edit me.
        <input type='date' ref='date' defaultValue={date} />
        <input ref='hour' defaultValue={hour}/>
        <input ref='description' defaultValue={description} />
        <button className='button' onClick={this.handleEdit.bind(this, this.props.appointment.id)}>
          Update
        </button>

      </div>
    )
  }

})
