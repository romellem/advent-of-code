import React from "react";

const Button = ({ step, steps, children } = {}) => {
  const fn = () => step(steps);

  return <button onClick={fn}>{children}</button>;
};

const Controls = props => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Button step={props.runUntilBreak}>▶</Button>
      </div>
      <div>
        <Button step={props.step} steps={1}>
          &gt;
        </Button>
        <Button step={props.step} steps={10}>
          ≫
        </Button>
        <Button step={props.step} steps={100}>
          ⋙
        </Button>
      </div>
    </div>
  );
};

export default Controls;
