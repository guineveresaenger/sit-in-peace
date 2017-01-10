var NewAppointment = React.createClass({
  handleClick(){
    var date = this.refs.date.value;
    var hour = this.refs.hour.value;
    var description = this.refs.description.value;

    // TODO: customize input form so it allows only correctly formatted date
    // TODO: validate inputs in general

    // use Moment.js to format into a valid date
    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();

    var sitterName = this.refs.sitterName.value;
    var sitter_id;
    if(sitterName !== '') {
      sitter_id = this.findSitterByName(sitterName).id;
    } else {
      sitter_id = null;
    }

    $.ajax({
      url: '/api/v1/appointments',
      type: 'POST',
      data: {appointment: {start_time: completeTime, description: description, sitter_id: sitter_id}},
      success: (appointment) => {
        this.props.handleSubmit(appointment)
      }
    })
  },

  findSitterByName(name) {
    return this.props.sitters.find((sitter) =>{
      return sitter.name == name;
    });
  },

  render() {
    var sitterChoices = [];
    for(var i = 0; i < this.props.sitters.length; i++){
      sitterChoices.push(
        <option value={this.props.sitters[i].name}  key={this.props.sitters[i].id}>
          {this.props.sitters[i].name}
        </option>
      )
    }
    return (
      <div>
        <input type='date' ref='date' placeholder='Enter the day of the appointment' />
        <input ref='hour' placeholder='00:00' />
        <input ref='description' placeholder='Enter the description of the appointment' />

        Pick a sitter:
        <select ref="sitterName">
          <option value={''}> --No Sitter-- </option>
          {sitterChoices}
        </select>
        <button onClick={this.handleClick} className="button">
          Submit
        </button>
      </div>
    )
  }
});
