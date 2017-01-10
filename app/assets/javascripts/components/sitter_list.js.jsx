var SitterList = React.createClass({
  getInitialState() {
    return {sitters: []}
  },
  componentDidMount() {
    $.getJSON('/api/v1/sitters.json',(response) => { this.setState({ sitters: response, showAddNew: false }) });
  },

  onButtonClick() {
    if (this.state.showAddNew){
      this.setState({
        showAddNew: false,
      })
    } else {
      this.setState({
        showAddNew: true,
      })
    }
  },

  handleSubmit(sitter){
    var newState = this.state.sitters.concat(sitter);
    this.setState({ sitters: newState, showAddNew: false });
    console.log("submitted this sitter: " + sitter);
    console.log("handleSubmit clicked!");
  },

  handleEdit(sitter) {
    console.log("edit handler clicked");
    $.ajax({
      url: `/api/v1/sitters/${ sitter.id }`,
      type: 'PUT',
      data: {sitter: sitter},
      success: () => {
        this.updateSitterList(sitter);
      }
    });
  },
  handleDelete(id){
    console.log("delete handler called");
    $.ajax({
      url: `/api/v1/sitters/${id}`,
      type: 'DELETE',
      success:() => {
        console.log("removed sitter");
        this.removeSitterFromList(id);
      }
    })
  },

  updateSitterList(sitter) {
    var updatedSitters = this.state.sitters.filter((s) => {
      return s.id !== sitter.id
    });
    updatedSitters.push(sitter);
    this.setState({sitters: updatedSitters})
  },

  removeSitterFromList(id) {
    var allSitters = this.state.sitters.filter((sitter) =>{
      return sitter.id != id;
    });
    this.setState({sitters: allSitters})
  },


  render() {
    var sitterList = [];
    for (var i =0; i < this.state.sitters.length; i ++) {
      sitterList.push(
        <div key={this.state.sitters[i].id}>
          <SitterDetails
            sitter={this.state.sitters[i]}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </div>
      )
    }
    return (
      <div>
        <button onClick={this.onButtonClick} className='button'>Add a new sitter</button>
        {this.state.showAddNew ? <NewSitter handleSubmit={this.handleSubmit}/> : null}
        {sitterList}
      </div>
    )
  }

})
