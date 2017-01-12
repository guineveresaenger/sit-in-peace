var NewAppointment = React.createClass({
  getInitialState(){
    return {
      potSitterIDs: [],
      showMessageSitters: false,
      // fieldsComplete: false,
    }
  },

  handleSubmit(){

    // if(!this.state.fieldsComplete){
    //   this.handleIncompleteFields();
    //   console.log("are the fields complete? " +this.state.fieldsComplete);
    //   if(!this.state.fieldsComplete){
    //     return;
    //   }
    // }


    var date = this.refs.date.value;
    var hour = this.refs.hour.value;
    var description = this.refs.description.value;

    if(!this.fieldsComplete()){
      return;
    }

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
    this.setState({showMessageSitters: !this.state.showMessageSitters})
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


  // setFieldsComplete() {
  //     if((this.refs.date.value !== '')&&(this.refs.hour.value === '')&&(this.refs.description.value === '')){
  //       this.setState({
  //         fieldsComplete: true
  //       })
  //     }
  // },

  render() {
    // console.log(this.fieldsComplete());
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

        {!this.state.showMessageSitters ? <button onClick={this.toggleMessageSitters} className='button'>Select sitters to message</button> : null}
        {this.state.showMessageSitters ? <SelectSitters sitters= {this.props.sitters} messageSitter={this.sittersToMessage}/> : null}
        <button onClick={this.handleSubmit} className="button alert">
          Submit
        </button>
      </div>
    )
  }
});
