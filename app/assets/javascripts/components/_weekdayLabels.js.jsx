var WeekdayLabels = React.createClass({
  render() {
    var days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var dates = [""].concat(this.props.dateRange);

    var labels = [];

    for(var i = 0; i < days.length; i++ ){
      labels.push(
        <div className="slot column day-header" key={days[i]}>
          <h5>{days[i]}</h5>
          {dates[i]}
        </div>
      )
    }

    return (
      <div className="row small-up-8">
        {labels}
      </div>
    )
  }
})
