var Main = React.createClass({
  getInitialState() {
    return {date: new Date()}
  },

  handleClick(){
    console.log("I've been clicked!");
  },

  render(){
  
    return (
            <div>
              <button onClick={this.handleClick}>Click me!</button>
              <p>
                {this.state.date.toJSON()}
              </p>
              <Week
                startOfWeek={this.props.startOfWeek}
                dateRange={this.props.dateRange}

              />
            </div>
        )
  }
})
