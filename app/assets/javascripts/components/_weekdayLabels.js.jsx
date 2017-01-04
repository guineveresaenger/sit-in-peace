var WeekdayLabels = React.createClass({
  render() {
    var headers = ["Today's date", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    var dayLabels = headers.map((header) => {
      return (
        <div className="slot column">
          <h5>{header}</h5>
        </div>
      )

    });
    return (
      <div className="row small-up-8">
        {dayLabels}
      </div>
    )

  }

})
