var SelectSitters = React.createClass({

  selectSitter(sitter) {
    this.props.messageSitter(sitter)
  },

  render() {
    var sitterChoices = [];
    for(var i = 0; i < this.props.sitters.length; i++){
      sitterChoices.push(
        <div key={this.props.sitters[i].id}>
          <button className="button" onClick={this.selectSitter.bind(this, this.props.sitters[i])}>
            {this.props.sitters[i].name}
          </button>
        </div>
      )

    }
    return(
      <div>
        {sitterChoices}
      </div>
    )
  }
})
