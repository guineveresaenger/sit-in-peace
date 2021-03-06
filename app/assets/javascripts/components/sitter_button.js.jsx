var SitterButton = React.createClass({
  getInitialState(){
    return {
      buttonClicked: false
    }
  },
  handleClick(sitter) {
    this.props.clickButton(sitter);
    this.setState({
      buttonClicked: true,
    })
  },
  handleUnclick(sitter) {
    this.props.unclickButton(sitter);
    this.setState({
      buttonClicked: false,
    })
  },

  render() {

    return(
      <div>
        {this.state.buttonClicked ?
          <button className="sitter-unselect" onClick={this.handleUnclick.bind(this, this.props.sitter)}> Unselect {this.props.sitter.name}
          </button> :
          <button className="sitter-select" onClick={this.handleClick.bind(this, this.props.sitter)}>
            Select {this.props.sitter.name}
          </button>
        }
      </div>
    )
  }
})
