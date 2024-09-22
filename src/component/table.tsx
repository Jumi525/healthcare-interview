import { useEffect, useState } from "react";
import Form from "./form";
import userservices, { TInfoData } from "../services/api";

const Table = () => {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [btnId, setBtnId] = useState(0);
  const [datas, setDatas] = useState<TInfoData[]>([]);
  const [errs, setErrs] = useState("");
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    userservices
      .getAllUser()
      .then((res) => {
        setDatas([...res.data]);
        setisLoading(false);
      })
      .catch((err) => setErrs(err.message));
  }, []);

  const addUser = (user: TInfoData) => {
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

  const deleteUser = (id: number) => {
    setDatas(datas.filter((u) => u.id !== id));

    userservices
      .deleteAllUser(id.toString())
      .catch((err) => setErrs(err.message));
  };

  const updateUser = (user: TInfoData) => {
    const originalUser = [...datas, user];
    setDatas(datas.map((u) => (u.id === user.id ? user : u)));

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
            <tr className="bg-slate-500" key={data.id.toString()}>
              <td>{data.id}</td>
              <td>{data.company.name}</td>
              <td>{data.company.catchPhrase}</td>
              <td>
                $
                {data.address.suite.split(" ")[1] === data.address.suite
                  ? data.address.suite
                  : data.address.suite.split(" ")[1]}
              </td>
              <td>
                {
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setBtnId(data.id);
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
                      setBtnId(data.id);
                      setEdit((prev) => !prev);
                      deleteUser(data.id);
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
            id: 0,
            company: {
              catchPhrase: "",
              name: "",
            },
            address: {
              suite: "",
            },
          }}
          onSetValue={(opens, datases) => {
            setAdd(opens);
            datases?.company.name
              ? addUser({
                  ...datases,
                  address: { suite: ` ${datases?.address.suite}` },
                })
              : "";
          }}
        />
      )}
      {edit &&
        datas.map(
          (data) =>
            data.id === btnId && (
              <Form
                key={data.id}
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
