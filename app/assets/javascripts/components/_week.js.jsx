var Week = React.createClass({
  render() {
    // make 24 table rows!
    var hours = [];
    for (var i = 0; i < 24; i++){
      hours.push(<div className="hour " key={i}><Hour/></div>);
    }
    return (
      <div>
        I am a week!
        {hours}

      </div>
    )
  }
});
