var Day = React.createClass({
  filterByDay(){
    var thisSlotAppts = [];
    this.props.thisHourAppts.map((appt) =>{
      if(appt.start_time.substr(0,10) == this.props.dayDate && appt.start_time.substr(11,2) == this.props.hourName) {
        thisSlotAppts.push(appt);
        console.log("heyyy: " + appt.description);
      }
    });
    return thisSlotAppts;
  },

  handleClick(){
    console.log("clicked a div: " + this.props.dayDate + " at " + this.props.hourName);
  },
  render() {
    var slotAppts = this.filterByDay().map((appt) =>{
      return (
        <div key={appt.id}>
          {appt.description}
        </div>
      )

    });

    if(slotAppts.length == 0){
      return (
        <div onClick={this.handleClick}>
          Blank
        </div>
      )
    } else {

      return (
        <div onClick={this.handleClick}>
          {slotAppts}
        </div>
      )
    }
  }
});
