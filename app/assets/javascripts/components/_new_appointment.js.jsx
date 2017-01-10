var NewAppointment = React.createClass({
  getInitialState(){
    return {
      potSitters: []
    }
  },

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
    var covered;
    if(sitterName !== '') {
      sitter_id = this.findSitterByName(sitterName).id;
      covered = true;
    } else {
      sitter_id = null;
      covered = false;
    }

    $.ajax({
      url: '/api/v1/appointments',
      type: 'POST',
      data: {appointment: {
        start_time: completeTime,
        description: description,
        sitter_id: sitter_id,
        covered: covered}},
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

  sittersToMessage(sitter) {
    console.log("sittersToMessage called in new_appointment");
    var sittersSoFar = this.state.potSitters;
    // for (var i = 0; i < this.state.potSitters; i++) {
    //   if this.state.potSitters[i].id ==
    // }
    sittersSoFar.push(sitter.id)
    this.setState({
      potSitters: sittersSoFar
    })
    console.log(this.state.potSitters);
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

        Assign a sitter:
        <select ref="sitterName">
          <option value={''}> --No Sitter-- </option>
          {sitterChoices}
        </select>

        Select sitters to message:
        <SelectSitters sitters= {this.props.sitters} sittersToMessage={this.sittersToMessage}/>

        <button onClick={this.handleClick} className="button">
          Submit
        </button>
      </div>
    )
  }
});
