var Day = React.createClass({

  handleClick(){
    console.log("clicked a div: " + this.props.dayDate + " at " + this.props.hourName);
  },
  render() {

    return (
      <div onClick={this.handleClick}>
        <p>
          I am a slot for {this.props.hourName}:00 hours <br/>
          My date is: {this.props.dayDate}<br/>
          This is where appointments go!
        </p>
      </div>
    )
  }
});
