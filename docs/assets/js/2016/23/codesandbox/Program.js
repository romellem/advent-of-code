import React from "react";

export const lineToString = line => {
  return line.op + " " + line.args[0] + " " + (line.args[1] || "");
};

const Program = ({ program, instruction } = {}) => {
  const rows = program.map((line, i) => {
    const active = i === instruction;
    const active_class = active ? "active" : "";
    return (
      <tr className={active_class}>
        <td className={active_class}>
          {active ? <b style={{ color: "maroon" }}>*</b> : ""}
        </td>
        <td
          className={active_class}
          style={{ textAlign: "right", paddingRight: "1em" }}
        >
          {active ? <b>{i}</b> : i}
        </td>
        <td className={active_class}>{lineToString(line)}</td>
      </tr>
    );
  });
  return (
    <div style={{ flexGrow: 1 }}>
      <table>
        <tbody>{rows}</tbody>
      </table>
      <div>
        {instruction > program.length - 1 ? (
          <b style={{ color: "green" }}>Done</b>
        ) : null}
      </div>
    </div>
  );
};

export default Program;
