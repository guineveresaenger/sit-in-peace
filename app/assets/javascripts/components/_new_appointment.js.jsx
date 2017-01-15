var NewAppointment = React.createClass({
  getInitialState(){
    this.props.currentDay === null ?
      day = '' :
      day = this.props.currentDay
    this.props.currentHour ===null ?
      hour= '' :
      (this.props.currentHour.length > 1 ? 
        hour= this.props.currentHour + ":00" :
        hour = "0" + this.props.currentHour + ":00"
      )

    return {
      potSitterIDs: [],
      showMessageSitters: false,
      showDropDown: false,
      currentDay: day,
      currentHour: hour,
    }
  },

  handleSubmit(){
    console.log("submit button clicked!");
    var date = this.state.currentDay;
    var hour = this.state.currentHour;
    var description = this.refs.description.value;

    if(!this.fieldsComplete()){
      return;
    }

    // TODO: customize input form so it allows only correctly formatted date

    // use Moment.js to format into a valid date
    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();

    var sitterName = this.setSitterName();

    // TODO: make the following lines more concise somehow?
    var sitter_id;
    if(sitterName !== '') {
      sitter_id = this.findSitterByName(sitterName).id;
    } else {
      sitter_id = null;

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

        }
      },
      success: (appointment) => {
        this.props.handleSubmit(appointment)

        // now message sitters - each one in our saved list
        console.log(this.state.potSitterIDs);
        for(var i = 0; i < this.state.potSitterIDs.length; i++){
          this.props.messageSitter(this.state.potSitterIDs[i], appointment)
        }
      }
    })
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

  addToPotSitters(sitter) {
    // this will add sitter id's to a list stored in state, so we can message all selected upon submit.
    var sittersSoFar = this.state.potSitterIDs;
    if (this.state.potSitterIDs.indexOf(sitter.id) === -1) {
      sittersSoFar.push(sitter.id)
      this.setState({
        potSitterIDs: sittersSoFar
      })
    }
  },

  removeFromPotSitters(sitter) {
    // this does the opposite
    var sittersSoFar = this.state.potSitterIDs;
    var index = this.state.potSitterIDs.indexOf(sitter.id)
    if (index >= 0) {
      sittersSoFar.splice(index, 1);
    }
    this.setState({
      potSitterIDs: sittersSoFar
    })
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

  handleCurrentDayChange(event) {
    this.setState({
      currentDay: event.target.value,
    });
  },

  handleCurrentHourChange(event) {
    this.setState({
      currentHour: event.target.value,
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
        <input type='date' ref='date' value={this.state.currentDay} onChange={ this.handleCurrentDayChange }
        />
      <input ref='hour' value={ this.state.currentHour } onChange={ this.handleCurrentHourChange }
        />
        <input ref='description' placeholder='Enter the description of the appointment'
        />

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

        { this.state.showMessageSitters ?
          <SelectSitters sitters= { this.props.sitters } messageSitter={ this.addToPotSitters }
          unmessageSitter={ this.removeFromPotSitters }

          /> : null
        }
        <button onClick={this.handleSubmit} className="button alert">
          Submit
        </button>
      </div>
    )
  }
});
