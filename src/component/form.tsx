import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TtableData } from "../services/api";

type formProps = {
  open: boolean;
  onSetValue: (open: boolean, value?: TtableData) => void;
  data: TtableData;
};

const Form = ({ open, onSetValue, data }: formProps) => {
  const classname = open ? "visible" : "hidden";
  const [objValue, setObjValue] = useState({
    num: "",
    name: "",
    price: "",
    description: "",
  });
  useEffect(() => {
    setObjValue({
      num: data.num,
      name: data.name,
      price: data.price,
      description: data.description,
    });
  }, [data.name]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValue = { ...objValue };
    onSetValue(false, newValue);
  };

  return (
    <>
      <div
        className={twMerge(
          "bg-slate-400 visible rounded-md p-4 focus:border-1 border-solid border-blue-700 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-full w-[80vw] z-10",
          classname
        )}
      >
        <button
          className=" btn btn-link absolute top-2 right-2 "
          onClick={() => onSetValue(false)}
        >
          <IoIosCloseCircleOutline className="h-7 w-7 bg-red-500 rounded-full" />
        </button>
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            className="form-control mt-1 mb-3"
            id="name"
            type="text"
            value={objValue.name}
            onChange={(e) =>
              setObjValue((obj) => ({ ...obj, name: e.target.value }))
            }
          />
          <label htmlFor="price">Price: </label>
          <input
            className="form-control mt-1 mb-3"
            type="number"
            name="price"
            id="price"
            value={objValue.price}
            onChange={(e) =>
              setObjValue((obj) => ({ ...obj, price: e.target.value }))
            }
          />
          <label htmlFor="description">Description: </label>
          <textarea
            className="form-control mt-1 mb-3"
            id="description"
            value={objValue.description}
            onChange={(e) =>
              setObjValue((obj) => ({ ...obj, description: e.target.value }))
            }
          ></textarea>
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
