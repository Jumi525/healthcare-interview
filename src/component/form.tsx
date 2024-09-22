import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TInfoData } from "../services/api";

type formProps = {
  open: boolean;
  onSetValue: (open: boolean, value?: TInfoData) => void;
  data: TInfoData;
};

const Form = ({ open, onSetValue, data }: formProps) => {
  const classname = open ? "visible" : "hidden";
  const [objValue, setObjValue] = useState({
    id: 0,
    company: {
      catchPhrase: "",
      name: "",
    },
    address: {
      suite: "",
    },
  });
  useEffect(() => {
    setObjValue({
      id: data.id,
      company: {
        catchPhrase: data.company.catchPhrase,
        name: data.company.name,
      },
      address: { suite: data.address.suite },
    });
  }, [data.id]);

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
            value={objValue.company.name}
            onChange={(e) =>
              setObjValue((obj) => ({
                ...obj,
                company: { ...obj.company, name: e.target.value },
              }))
            }
          />
          <label htmlFor="price">Price: </label>
          <input
            className="form-control mt-1 mb-3"
            name="price"
            id="price"
            placeholder="example 1, 2, 3......."
            value={objValue.address.suite}
            onChange={(e) =>
              setObjValue((obj) => ({
                ...obj,
                address: { suite: e.target.value },
              }))
            }
          />
          <label htmlFor="description">Description: </label>
          <textarea
            className="form-control mt-1 mb-3"
            id="description"
            value={objValue.company.catchPhrase}
            onChange={(e) =>
              setObjValue((obj) => ({
                ...obj,
                company: { ...obj.company, catchPhrase: e.target.value },
              }))
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
