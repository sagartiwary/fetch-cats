import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { Spinner } from "flowbite-react";

const initState = {
  data: [],
  isLoading: false,
  error: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};
export const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [costing, setCosting] = useState("asc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [query, setQuery] = useState(""); // State for debounced search query

  const fetchSearchResults = (query) => {
    dispatch({ type: "LOADING" });
    axios
      .get(`http://localhost:8080/cats`, {
        params: {
          _sort: "cost",
          _order: costing,
          _page: page,
          _limit: 8,
          q: query,
        },
      })
      .then((res) => {
        let data = res.data;
        console.log(res);
        setTotal(Number(res.headers["x-total-count"]));
        dispatch({ type: "SUCCESS", payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FAILURE" });
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/cats/${id}`)
      .then((res) => {
        fetchSearchResults("")
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    fetchSearchResults(query);
  }, [costing, page,query]);

  const { isLoading, data, error } = state;

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <h1>Something wrong... Please try again</h1>;
  }
  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCosting("asc")}
          className="border border-gray-300 px-6 py-2 rounded text-lg font-semibold bg-green-600 text-white mr-4"
          disabled={costing === "asc"}
        >
          Sort Asc
        </button>
        <button
          className="border border-gray-300 px-6 py-2 rounded text-lg font-semibold bg-pink-600 text-white ml-4"
          disabled={costing === "desc"}
          onClick={() => setCosting("desc")}
        >
          Sort Desc
        </button>
        <input
          type="text"
          placeholder="search..."
          className="rounded ml-2 text-md border border-gray-400 bg-white focus:bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-4 w-[80%] mt-6 mx-auto md:grid-cols-3">
        {data.length > 0 &&
          data.map((ele) => (
            <div
              className="border border-gray-400 shadow-md"
              key={Math.random()}
            >
              <img className="w-full h-[300px]" src={ele.image} alt="" />
              <p className="text-center text-lg font-semibold">
                Name: {ele.name}
              </p>
              <p className="text-center">Cost: {ele.cost}</p>
              <p className="text-center">Likes: {ele.likes}</p>
              <p className="text-center">Breed: {ele.breed}</p>
              <button
                className="border border-gray-400 bg-red-600 text-white px-6 rounded  block mx-auto mt-3 mb-2 py-2"
                onClick={() => handleDelete(ele.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="flex justify-center items-center mt-5 mb-6">
        <button
          className=" mr-2 border border-gray-300 bg-blue-400 px-6 py-2 rounded uppercase text-white font-serif text-lg"
          onClick={() => setPage(page - 1)}
          disabled={page===1}
        >
          Pre
        </button>
        <button className="mr-2 order border-gray-300 bg-green-300 px-6 py-2 rounded uppercase text-white font-serif text-lg">
          {page}
        </button>
        <button
          disabled={page === Math.floor(total / 8)}
          className="mt-2 mr-2 order border-gray-300 bg-yellow-300 px-6 py-2 rounded uppercase text-white font-serif text-lg"
          onClick={() => setPage(page + 1)}
        >
          {" "}
          Next
        </button>
      </div>
    </>
  );
};
