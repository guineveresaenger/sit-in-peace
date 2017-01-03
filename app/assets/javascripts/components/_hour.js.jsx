var Hour = React.createClass({
  render() {
    // make 7 days
    var days = [];
    var day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for (var i = 0; i < 7; i++){
      days.push(<div className="slot column" key={day_names[i]}><Day /></div>);
    }
    return (
      <div className="row small-up-7">

        {days}
      </div>
    )
  }
});
