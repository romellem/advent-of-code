import React from "react";

class BreakOn extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.onchange = e => {
      this.props.setDeviceBreakOn(this.myRef.current.value);
    };
  }

  render() {
    return (
      <label>
        Break on: <input ref={this.myRef} />
      </label>
    );
  }
}
export default BreakOn;
