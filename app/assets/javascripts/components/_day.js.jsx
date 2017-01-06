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
  // handleEmptySlot(){
  //   console.log("clicked a slot on " + this.props.dayDate + " at " + this.props.hourName);
  // },
  render() {
    var slotAppts = this.filterByDay().map((appt) =>{
      return (
        <div key={appt.id} onClick={this.displayDetails.bind(this, appt.id)} >
          {appt.description}
        </div>
      )

    });

    if(slotAppts.length == 0){
      return (
        <div>

        </div>
      )
    } else {

      return (
        <div >
          {slotAppts}
        </div>
      )
    }
  }
});
