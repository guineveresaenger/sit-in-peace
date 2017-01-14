var SelectSitters = React.createClass({

  selectSitter(sitter) {
    this.props.messageSitter(sitter)
  },

  unselectSitter(sitter) {
    this.props.unmessageSitter(sitter)
  },

  render() {
    var sitterChoices = [];
    for(var i = 0; i < this.props.sitters.length; i++){
      sitterChoices.push(
        <div key={ this.props.sitters[i].id }>
          <SitterButton
            sitter={ this.props.sitters[i] } clickButton={ this.selectSitter }
            unclickButton={ this.unselectSitter }
          />

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
