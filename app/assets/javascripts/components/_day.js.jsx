var Day = React.createClass({
  render() {

    return (
      <div>
        <p>
          I am a slot for {this.props.hourName}:00 hours
        </p>
        <p>
          My date is: {this.props.dayDate}

        </p>
      </div>
    )
  }
});
