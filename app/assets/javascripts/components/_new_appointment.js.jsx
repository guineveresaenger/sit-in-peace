var NewAppointment = React.createClass({
  getInitialState(){
    return {
      potSitterIDs: [],
      showMessageSitters: false,
      showDropDown: false,
    }
  },

  handleSubmit(){

    var date = this.refs.date.value;
    var hour = this.refs.hour.value;
    var description = this.refs.description.value;

    // TODO: uncomment the next 3 lines!
    if(!this.fieldsComplete()){
      return;
    }

    // TODO: customize input form so it allows only correctly formatted date

    // use Moment.js to format into a valid date
    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();

    var sitterName = this.setSitterName();
    
    var sitter_id;
    var covered;
    if(sitterName !== '') {
      sitter_id = this.findSitterByName(sitterName).id;
      covered = true;
    } else {
      sitter_id = null;
      covered = false;
    }
    // post to database
    $.ajax({
      url: '/api/v1/appointments',
      type: 'POST',
      data: {appointment:
        {
          start_time: completeTime,
          description: description,
          sitter_id: sitter_id,
          covered: covered,
        }
      },
      success: (appointment) => {
        this.props.handleSubmit(appointment)

      }
    })
    // now message sitters - each one in our saved list
    for(var i = 0; i < this.state.potSitterIDs.length; i++){
      this.props.messageSitter(this.state.potSitterIDs[i], description, date, hour)
    }
  },

  setSitterName() {
    if (this.refs.sitterName === undefined){
      return '';
    } else {
      return this.refs.sitterName.value
    }

  },

  findSitterByName(name) {
    return this.props.sitters.find((sitter) =>{
      return sitter.name == name;
    });
  },

  sittersToMessage(sitter) {
    // this will add sitter id's to a list stored in state, so we can message all selected upon submit.
    var sittersSoFar = this.state.potSitterIDs;
    if (this.state.potSitterIDs.indexOf(sitter.id) === -1) {
      sittersSoFar.push(sitter.id)
      this.setState({
        potSitterIDs: sittersSoFar
      })
    }
  },

  toggleMessageSitters() {
    console.log("toggleMessageSitters called");
    this.setState({
      showMessageSitters: !this.state.showMessageSitters,
      showDropDown: false,
    })

  },

  toggleShowDropDown(){
    console.log("toggleShowDropDown called");
    this.setState({
      showDropDown: !this.state.showDropDown,
      showMessageSitters: false,
    })

  },

  fieldsComplete() {
    if(this.refs.date.value === '') {
      alert('needs date');
    }
    if(this.refs.hour.value === '') {
      alert('needs hour');
    }
    if(this.refs.description.value === '') {
      alert('needs description');
    }
    if((this.refs.date.value !== '')&&(this.refs.hour.value !== '')&&(this.refs.description.value !== '')){
      return true;
    }
    return false;
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

        <button onClick={this.toggleShowDropDown} className='button'>
          Assign a sitter manually
        </button>


        { this.state.showDropDown ?
          <select ref="sitterName">
            <option value={''}> --No Sitter-- </option>
            {sitterChoices}
          </select> : null
        }


        <button onClick={this.toggleMessageSitters} className='button'>
          Select sitters to message
        </button>

        {this.state.showMessageSitters ?
          <SelectSitters sitters= {this.props.sitters} messageSitter={this.sittersToMessage}/> : null
        }
        <button onClick={this.handleSubmit} className="button alert">
          Submit
        </button>
      </div>
    )
  }
});
