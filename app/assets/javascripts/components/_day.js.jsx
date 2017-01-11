var Day = React.createClass({
  filterByDay(){
    var thisSlotAppts = [];
    this.props.thisHourAppts.map((appt) =>{
      if(appt.start_time.substr(0,10) == this.props.dayDate && appt.start_time.substr(11,2) == this.props.hourName) {
        thisSlotAppts.push(appt);
      }
    });
    return thisSlotAppts;
  },

  displayDetails(id){
    this.props.displayDetails(id)
  },

  findSitter(id) {
    if( id === null) {
      return null;
    } else {
        return this.props.sitters.find((sitter) => {
          return sitter.id == id;
        });
      }
  },

  render() {
    var slotAppts = this.filterByDay().map((appt) =>{
      var sitterName;
      this.findSitter(appt.sitter_id) ? sitterName = this.findSitter(appt.sitter_id).name : sitterName = ''

      return (
        <div key={appt.id} onClick={this.displayDetails.bind(this, appt.id)} >
          {appt.description}
          {sitterName}
        </div>
      )

    });

    return (
      (slotAppts.length == 0) ? null : <div>{slotAppts}</div>
    )
  }
});
