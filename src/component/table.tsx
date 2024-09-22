import { useEffect, useState } from "react";
import Form from "./form";
import userservices, { TInfoData, TtableData } from "../services/api";

const tableData = [
  {
    num: "1",
    name: "licencing",
    description: "hello world what is happpening",
    price: "12",
  },
  {
    num: "2",
    name: "hospitality",
    description: "hello world  a table",
    price: "13",
  },
  {
    num: "3",
    name: "helth",
    description: "hello world i am goin to ",
    price: "14",
  },
  {
    num: "4",
    name: "care",
    description: " i am goin to buil a table",
    price: "15",
  },
];

const Table = () => {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [btnId, setBtnId] = useState("");
  const [datas, setDatas] = useState(tableData);
  const [infoData, setInfoData] = useState<TInfoData[]>([]);
  const [errs, setErrs] = useState("");
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    userservices
      .getAllUser()
      .then((res) => {
        setInfoData(res.data);
        setisLoading(false);
      })
      .catch((err) => setErrs(err.message));

    setDatas(
      infoData.map((value) => ({
        num: value.id.toString(),
        name: value.company.name,
        description: value.company.catchPhrase,
        price: value.address.suite.split(" ")[1],
      }))
    );
  }, []);

  const addUser = (user: TtableData) => {
    const originalUser = [...datas, user];
    setDatas([...datas, user]);

    userservices
      .createAllUser(user)
      .then((res) => setDatas([res.data, ...datas]))
      .catch((err) => {
        setErrs(err.message);
        setDatas(originalUser);
      });
  };

  const deleteUser = (id: string) => {
    setDatas(datas.filter((u) => u.num !== id));

    userservices.deleteAllUser(id).catch((err) => setErrs(err.message));
  };

  const updateUser = (user: TtableData) => {
    const originalUser = [...datas, user];
    setDatas(datas.map((u) => (u.num === user.num ? user : u)));

    userservices.updateAllUser(user).catch((err) => {
      setErrs(err.message);
      setDatas(originalUser);
    });
  };

  if (errs)
    return (
      <div className="py-5 grid place-content-center text-2xl text-red-800">
        ...{errs}...
      </div>
    );
  if (loading)
    return (
      <div className="py-5 grid place-content-center text-2xl text-blue-800">
        ...Loading...
      </div>
    );
  return (
    <div className="p-2">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr className="bg-slate-500" key={data.num}>
              <td>{data.num}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>${data.price}</td>
              <td>
                {
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setBtnId(data.price);
                      setEdit((prev) => !prev);
                    }}
                  >
                    Edit
                  </button>
                }
              </td>
              <td>
                {
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setBtnId(data.price);
                      setEdit((prev) => !prev);
                      deleteUser(data.num);
                    }}
                  >
                    Delete
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => {
          setAdd((prev) => !prev);
        }}
      >
        Add
      </button>

      {add && (
        <Form
          open={add}
          data={{
            num: "",
            name: "",
            price: "",
            description: "",
          }}
          onSetValue={(opens, datases) => {
            setAdd(opens);
            datases?.name ? addUser(datases) : "";
          }}
        />
      )}
      {edit &&
        datas.map(
          (data) =>
            data.price === btnId && (
              <Form
                key={data.price}
                open={edit}
                data={data}
                onSetValue={(opens, datases) => {
                  setEdit(opens);
                  if (datases) updateUser(datases);
                }}
              />
            )
        )}
    </div>
  );
};

export default Table;
