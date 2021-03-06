var AppointmentDetails = React.createClass({

  getInitialState() {
    return this.stateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps){
      this.setState(this.stateFromProps(nextProps));
    }
  },

  findSitterByID(id) {
    return this.props.sitters.find((sitter) => {
      return sitter.id == id;
    });

  },
  findSitterByName(name) {
    return this.props.sitters.find((sitter) =>{
      return sitter.name == name;
    });
  },

  stateFromProps(props){
    var sitterName;
    var date;
    var hour;
    var description;
    if (props.appointment === null){
      date = props.currentDay;
      hour = props.currentHour;
      description = '';
      sitterName = '';
    } else {
      date = props.appointment.start_time.substr(0,10);
      hour = props.appointment.start_time.substr(11,5);
      description = props.appointment.description;
      if(this.findSitterByID(props.appointment.sitter_id)) {
        sitterName = this.findSitterByID(props.appointment.sitter_id).name;
      } else{
        sitterName = '';
      }
    }
    return {
      date: date,
      hour: hour,
      description: description,
      sitter_name: sitterName,
      potSitterIDs:[],
      showMessageSitters: false,
    };
  },

  handleEdit(){
    console.log("update button clicked");
    var date = this.state.date;
    var hour = this.state.hour;
    var description = this.state.description;
    var sitter_id;
    this.findSitterByName(this.state.sitter_name) ? sitter_id = this.findSitterByName(this.state.sitter_name).id : sitter_id = null


    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();
    //Keep the same id but update description and/or time
    var appointment = {
      id: this.props.appointment.id,
      start_time: completeTime,
      description: description,
      sitter_id: sitter_id,

    };
    this.props.handleEdit(appointment);
    for(var i = 0; i < this.state.potSitterIDs.length; i++){
      this.props.messageSitter(this.state.potSitterIDs[i], appointment)
    }

  },
  handleDelete(){
    this.props.handleDelete(this.props.appointment.id)
  },

  fieldsComplete(){
    if(!this.state.date){
      alert("Please enter a date.");
      return false;
    }
    if(!this.state.hour) {
      alert("Please enter the time.");
      return false;
    }
    if(!this.state.description) {
      alert("Please describe the appointment.");
      return false;
    }
    return true;
  },

  handleSubmit(){
    var date = this.state.date;
    var hour = this.state.hour;
    var description = this.state.description;

    if(!this.fieldsComplete()){
      return;
    }

    // use Moment.js to format into a valid date
    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();

    var sitter_id;
    this.findSitterByName(this.state.sitter_name) ? sitter_id = this.findSitterByName(this.state.sitter_name).id : sitter_id = null

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
        for(var i = 0; i < this.state.potSitterIDs.length; i++){
          this.props.messageSitter(this.state.potSitterIDs[i], appointment)
        }
      }
    })
  },

  handleDateChange(event) {
    this.setState({
      date: event.target.value,
    });
  },

  handleHourChange(event) {
    this.setState({
      hour: event.target.value,
    });
  },
  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  },
  handleSitterChange(event) {
    this.setState({
      sitter_name: event.target.value,
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
    this.setState({
      showMessageSitters: !this.state.showMessageSitters,
    })
  },

  render() {
    var sitterChoices = [];
    for(var i = 0; i < this.props.sitters.length; i++){
      sitterChoices.push(
        <option value={this.props.sitters[i].name} key={this.props.sitters[i].id}>
          {this.props.sitters[i].name}
        </option>
      )
    }
    return(
      <div>
        <input type='date' value={ this.state.date } onChange={ this.handleDateChange } className='input-field'/>
        <input value={ this.state.hour } onChange={ this.handleHourChange } placeholder="Enter a time, e.g. '00:00'" className='input-field'/><br></br>
        <input value={ this.state.description } onChange={ this.handleDescriptionChange } placeholder='Enter the description of the appointment' className='input-field'/>
        <div className='top-spacing'></div>
        <select value={this.state.sitter_name} onChange={this.handleSitterChange} className='input-field'>
          <option value={''}> --No Sitter-- (Select a Sitter) </option>
          {sitterChoices}
        </select>

        {this.state.showMessageSitters ? null :
          <button onClick={this.toggleMessageSitters} className='button success'>
            Select sitters to message
          </button>
        }

        { this.state.showMessageSitters ?
          <SelectSitters sitters= { this.props.sitters } messageSitter={ this.addToPotSitters }
          unmessageSitter={ this.removeFromPotSitters }

          /> : null
        }

        {this.props.appointment ?
        <div>
          <button className='button success' onClick={ this.handleEdit }>
            Update
          </button>
          <button className='button alert' onClick={ this.handleDelete }>
            Delete
          </button>
        </div> :
        <button onClick={this.handleSubmit} className="button alert">
          Submit
        </button>
        }
      </div>
    )
  }

})
