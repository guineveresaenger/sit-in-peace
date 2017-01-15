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
    this.findSitterByID(props.appointment.sitter_id) ? sitterName = this.findSitterByID(props.appointment.sitter_id).name : sitterName = ''
    return {
      date: props.appointment.start_time.substr(0,10),
      hour: props.appointment.start_time.substr(11,5),
      description: props.appointment.description,
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
    console.log(appointment);
    this.props.handleEdit(appointment);
    console.log(this.state.potSitterIDs);
    for(var i = 0; i < this.state.potSitterIDs.length; i++){
      this.props.messageSitter(this.state.potSitterIDs[i], appointment)
    }

  },
  handleDelete(){
    this.props.handleDelete(this.props.appointment.id)
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
      console.log("sitterCHange called");
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
    console.log("toggleMessageSitters called");
    this.setState({
      showMessageSitters: !this.state.showMessageSitters,
      // showDropDown: false,
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
        I am an appointment. You can edit me. Or delete me.
        <input type='date' value={ this.state.date } onChange={ this.handleDateChange }/>
        <input value={ this.state.hour } onChange={ this.handleHourChange }/>
        <input value={ this.state.description } onChange={ this.handleDescriptionChange }/>

        Pick a sitter:
        <select value={this.state.sitter_name} onChange={this.handleSitterChange}>
          <option value={''}> --No Sitter-- </option>
          {sitterChoices}
        </select>

        <button onClick={this.toggleMessageSitters} className='button'>
          Select sitters to message
        </button>

        { this.state.showMessageSitters ?
          <SelectSitters sitters= { this.props.sitters } messageSitter={ this.addToPotSitters }
          unmessageSitter={ this.removeFromPotSitters }

          /> : null
        }


        <button className='button' onClick={ this.handleEdit }>
          Update
        </button>
        <button className='button' onClick={ this.handleDelete }>
          Delete
        </button>

      </div>
    )
  }

})
