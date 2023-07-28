import axios from "axios";
import { useReducer } from "react";
const initState = {
  name: "",
  cost: "",
  likes: "",
  description: "",
  breed: "",
};

const reducer = (state, action) => {
  const { type, payload1, payload2 } = action;
  switch (type) {
    case "UPDATE":
      return {
        ...state,
        [payload1]:
          payload1 === "cost" || payload1 === "likes" ? +payload2 : payload2,
      };
    default:
      return state;
  }
};

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    return dispatch({ type: "UPDATE", payload1: name, payload2: value });
  };
  //   console.log(name)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/cats`, state)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const { name, cost, description, breed, likes } = state;
  return (
    <>
      <h1 className="text-center mt-6 text-3xl font-bold font-serif mb-6">
        Form
      </h1>
      <div className="max-w-xl  rounded mx-auto mb-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            className=" text-lg px-3 py-2 border border-gray-300 w-full bg-white hover:bg-white active:bg-white rounded transition duration-150 ease-in mt-1 mb-1"
          />
          <input
            type="text"
            placeholder="Cost"
            className=" text-lg px-3 py-2 border border-gray-300 w-full bg-white hover:bg-white active:bg-white rounded transition duration-150 ease-in mt-1 mb-1"
            value={cost}
            name="cost"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Likes"
            className=" text-lg px-3 py-2 border border-gray-300 w-full bg-white hover:bg-white active:bg-white rounded transition duration-150 ease-in mt-1 mb-1"
            name="likes"
            value={likes}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            className=" text-lg px-3 py-2 border border-gray-300 w-full bg-white hover:bg-white active:bg-white rounded transition duration-150 ease-in mt-1 mb-1"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Breed"
            className=" text-lg px-3 py-2 border border-gray-300 w-full bg-white hover:bg-white active:bg-white rounded transition duration-150 ease-in mt-1 mb-1"
            name="breed"
            value={breed}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="text-lg border border-gray-300 w-full bg-blue-500 text-white uppercase px-2 py-2 rounded hover:shadow-lg hover:bg-blue-800 transition duration-150 ease-in-out mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
