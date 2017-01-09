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
    return {
      date: props.appointment.start_time.substr(0,10),
      hour: props.appointment.start_time.substr(11,5),
      description: props.appointment.description,
      sitter: this.findSitterByID(props.appointment.sitter_id)

    };
  },

  handleEdit(){
    console.log("update button clicked");
    var date = this.state.date;
    var hour = this.state.hour;
    var description = this.state.description;
    var sitter = this.state.sitter;

    var completeTime = moment(date + "T" + hour + "+0000").toDate().toJSON();
    //Keep the same id but update description and/or time
    var appointment = {
      id: this.props.appointment.id,
      start_time: completeTime,
      description: description,
      sitter: sitter,

    };
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
    this.setState({
      sitter: this.findSitterByName(event.taget.value),
    });
  },

  render() {
    return(
      <div>
        I am an appointment. You can edit me. Or delete me.
        <input type='date' value={ this.state.date }
               onChange={ this.handleDateChange }/>
        <input value={ this.state.hour }
                onChange={ (event) => this.handleHourChange }/>
        <input value={ this.state.description }
               onChange={ (event) => this.handleDescriptionChange }/>
        <input value={this.state.sitter.name}
              onChange={ (event) => this.handleSitterChange }/>


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
