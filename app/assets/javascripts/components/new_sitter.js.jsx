var NewSitter = React.createClass({
  handleClick() {
    var name = this.refs.name.value;
    var phone = this.refs.phone.value;
    var email = this.refs.email.value;

    $.ajax({
      url:'/api/v1/sitters',
      type: 'POST',
      data: {sitter: {
        name: name,
        phone: phone,
        email: email,
      }},
      success: (sitter) => {
        this.props.handleSubmit(sitter)
      }

    })

  },
  render() {
    return (
      <div>
        <input ref='name' placeholder="Enter the sitter's name" />
        <input ref='phone' placeholder='1234567890' />
        <input ref='email' placeholder="Enter the sitter's email" />
        <button onClick={this.handleClick} className="button">
          Submit
        </button>
      </div>
    )
  }
})
