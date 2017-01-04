var Week = React.createClass({
  render() {
    // make 24 table rows!
    var hours = [];
    for (var i = 0; i < 24; i++){
      hours.push(
        <div className="hour" key={i}>
          <Hour hourName={i}
            startOfWeek={this.props.startOfWeek}
            dateRange={this.props.dateRange}
            />

        </div>
      );
    }
    return (
      <div>
        <p>
          {this.props.start_of_week}
        </p>

        {hours}
        Hello
        <AllAppointments />

      </div>
    )
  }
});
