import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, columns) => {
    if (columns.content) return columns.content(item);
    return _.get(item, columns.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((columns) => (
              <td key={item._id + (columns.path || columns.key)}>
                {this.renderCell(item, columns)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
