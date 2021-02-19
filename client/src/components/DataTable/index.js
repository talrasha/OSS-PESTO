import React, { useState, useEffect } from "react";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useRowSelect,
} from "react-table";
import { getAge } from "../custom-module";
import { Link } from "react-router-dom";
import { Checkbox } from "../Checkbox";

function Table({ columns, data, onRowSelect }) {
/*
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
*/
  const [showCheckBoxes] = useState(false);

  /*const onClick = () =>
    showCheckBoxes ? setShowCheckBoxes(false) : setShowCheckBoxes(true);*/

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  React.useEffect(() => {
    onRowSelect(selectedFlatRows.map((row) => row.original));
  }, [onRowSelect, selectedFlatRows]);

  const CheckBoxes = () => (
    <div>
      <div className="checkbox-div">
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>
      {allColumns.map((column) => {
        if (column.Header === "ID" || typeof column.Header !== "string") {
          return null;
        }
        return (
          <div key={column.id} className="checkbox-div">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.Header}
            </label>
          </div>
        );
      })}
      <br />
    </div>
  );

  return (
    <span style={{ overflowX: "auto" }}>
      {/*<input
        type="submit"
        value="Hide Columns"
        className="btn-style"
        onClick={onClick}
      />*/}
      {showCheckBoxes ? <CheckBoxes /> : null}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (column.Header !== "ID") {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : ""}
                      </span>
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  let projectId = row.values._id;
                  var temp = Object.assign({}, cell);
                  if (temp.column.Header === "Age") {
                    const age = getAge(temp.value);
                    return <td key={index}> {age} </td>;
                  } else if (temp.column.Header === "Project Name") {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        <Link to={{ pathname: `/${projectId}` }}>
                          {cell.render("Cell")}
                        </Link>
                      </td>
                    );
                  } else if (temp.column.Header !== "ID") {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </span>
  );
}

export default function DataTable({ columns, data, compareButton }) {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const selectedRowsLength = selectedRows.length;
    if (selectedRowsLength > 0) {
      localStorage.setItem("selectedRowData", JSON.stringify(selectedRows));
    }
  }, [selectedRows]);

  return (
    <div style={{ overflowX: "auto" }}>
      {compareButton && (
        <Link
          className="action btn-style"
          to={{
            pathname: "/compare",
            selectedRows,
            columns,
          }}
        >
          Compare Projects
        </Link>
      )}

      <Table columns={columns} data={data} onRowSelect={setSelectedRows} />
    </div>
  );
}
