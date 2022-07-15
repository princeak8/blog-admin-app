import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import AuthContext from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "./css/Posts.module.css";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as FiIcon from "react-icons/fi";
import Table from "../components/Table";

const Posts = () => {
  const posts = useSelector((state) => state.postsDisplay.allPosts);
  // console.log("🚀 ~ file: Posts.jsx ~ line 15 ~ Posts ~ posts", posts);

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Published",
        accessor: "published",
        Cell: (props) => (props.value == true ? "Published" : "Not Published"),
      },
      {
        Header: "Visible",
        accessor: "visible",
        Cell: (props) => (props.value == true ? "Visible" : "Not Visible"),
      },
      {
        Header: "Created",
        accessor: "created_at",
        // Cell: (props) => dayjs(props.value).format("DD-MMM-YYYY"),
      },
    ],
    []
  );

  const data = useMemo(() => [...posts], [posts]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Publish",
        Header: "Call to Action",
        Cell: ({ row }) => (
          <button
            type="button"
            className={`btn ${styles.action_button}`}
            onClick={() => console.log("clicked", row.original)}
          >
            {row.original.published ? "Take Down" : "Publish"}
          </button>
        ),
      },
    ]);
  };

  const tableInstance = useTable({ columns, data }, tableHooks);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div className={styles.container}>
        <h1>Posts</h1>{" "}
        <button type="button" onClick={() => navigate("/admin/posts/add")}>
          Create new Post
        </button>
        <Table styling={"reports"} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Posts;
