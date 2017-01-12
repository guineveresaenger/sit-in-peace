var Main = React.createClass({
  getInitialState() {
    return {date: moment().toJSON()}
  },

  displayNextWeek(){
    var newStartDate = moment(this.state.date).add(7, 'days').toJSON();
    this.setState({
      date: newStartDate
    })
  },

  displayPreviousWeek(){
    var newStartDate = moment(this.state.date).subtract(7, 'days').toJSON();
    this.setState({
      date: newStartDate
    })
  },

  displayCurrentWeek(){
    var newStartDate = moment().toJSON();
    this.setState({
      date: newStartDate
    })
  },

  render(){
    var startOfWeek = moment(this.state.date).startOf('isoweek').toDate().toJSON();
    var dateRange = [];
    for (var i = 0; i < 7; i++){
      dateRange.push(
        moment(startOfWeek).add(i, 'days').toJSON()
      )
    }
    return (
            <div>
              <button className='button' onClick={this.displayNextWeek}>Next week!</button>
              <button className='button' onClick={this.displayPreviousWeek}>Previous week!</button>
              <button className='button' onClick={this.displayCurrentWeek}>Current week!</button>

              <Week
                startOfWeek={this.props.startOfWeek}
                dateRange={dateRange}

              />
            </div>
        )
  }
})
