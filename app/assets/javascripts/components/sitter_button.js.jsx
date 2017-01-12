var SitterButton = React.createClass({
  getInitialState(){
    return {
      buttonClicked: false
    }
  },
  handleClick(sitter) {
    this.props.clickButton(sitter);
    this.setState({
      buttonClicked: true
    })
  },

  render() {

    return(
      <div>
        {this.state.buttonClicked ? <button className="button secondary">
          {this.props.sitter.name} has been notified.
      </button>: <button className="button" onClick={this.handleClick.bind(this, this.props.sitter)}>
          {this.props.sitter.name}
        </button>}
      </div>
    )
  }
})
