

var Main = React.createClass({
  getInitialState() {
    return {date: moment().toJSON()}
  },

  handleClick(){
    console.log("I've been clicked!");
  },

  render(){
    var startOfWeek = moment(this.state.date).startOf('isoweek').toDate().toJSON();
    var dateRange = [];
    for (var i = 0; i < 7; i++){
      dateRange.push(
        moment(startOfWeek).add(i, 'days').toJSON()
      )
    }
    console.log(dateRange[0]);
    return (
            <div>
              <button onClick={this.handleClick}>Click me!</button>
              <Week
                startOfWeek={startOfWeek}
                dateRange={dateRange}

              />
            </div>
        )
  }
})
