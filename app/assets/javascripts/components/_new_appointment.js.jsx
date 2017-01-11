var NewAppointment = React.createClass({
  getInitialState(){
    return {
      // potSitterIDs: [],
      showMessageSitters: false,
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
    var pot_sitters = this.state.potSitters

    $.ajax({
      url: '/api/v1/appointments',
      type: 'POST',
      data: {appointment:
        {
          start_time: completeTime,
          description: description,
          sitter_id: sitter_id,
          covered: covered,
          pot_sitters: pot_sitters,
        }
      },
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

  messageSitter(sitter) {
    console.log("messageSitter called in new_appointment");
    var body = this.refs.description.value;
    var phone = sitter.phone
    $.ajax({
      url: '/messages/initiate',
      type: 'POST',
      data: {body: body, phone: phone},

      success: (response) => {
        console.log("yay message sent!");
      }
    })
    // var sittersSoFar = this.state.potSitterIDs;
    // if (this.state.potSitterIDs.indexOf(sitter.id) === -1) {
    //   sittersSoFar.push(sitter.id)
    //   this.setState({
    //     potSitterIDs: sittersSoFar
    //   })
    // }
    // console.log(this.state.potSitterIDs);
  },

  toggleMessageSitters() {
    console.log("toggleMessageSitters clicked");
    this.setState({showMessageSitters: !this.state.showMessageSitters})
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

        <button onClick={this.toggleMessageSitters} className='button'>Select sitters to message</button>
        {this.state.showMessageSitters ? <SelectSitters sitters= {this.props.sitters} messageSitter={this.messageSitter}/> : null}
        <button onClick={this.handleClick} className="button alert">
          Submit
        </button>
      </div>
    )
  }
});
