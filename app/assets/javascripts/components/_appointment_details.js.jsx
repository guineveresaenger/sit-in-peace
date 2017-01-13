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
