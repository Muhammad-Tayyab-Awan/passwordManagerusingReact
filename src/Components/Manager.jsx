import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  let ref = useRef();
  let refSp = useRef();
  let [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  function showPassword() {
    if (ref.current.src.includes("/eye.svg")) {
      refSp.current.type = "text";
      ref.current.src = "/eyecross.svg";
    } else {
      refSp.current.type = "password";
      ref.current.src = "/eye.svg";
    }
  }

  function formHandle(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }

  function savePassword() {
    if (
      form.site.length > 5 &&
      form.username.length > 5 &&
      form.password.length > 5
    ) {
      toast.success("Password Saved!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
    } else {
      toast.warn("Password Not Saved!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
    setForm({ site: "", username: "", password: "" });
  }

  function copyText(text) {
    toast.info("Copied To Clipboard!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text);
  }
  function editPassword(id) {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  }
  function deletePassword(id) {
    toast.success("Password Deleted!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 pt-3 md:mycontainer min-h-[80vh]">
        <h1 className="font-bold text-2xl text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">M/&gt;</span>
        </h1>
        <p className="text-center text-green-900 text-lg">
          Your Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-4 items-center">
          <input
            value={form.site}
            onChange={formHandle}
            placeholder="Enter website URL"
            className="rounded-full border w-full border-green-900 p-2"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex md:flex-row flex-col gap-4 justify-between w-full">
            <input
              value={form.username}
              onChange={formHandle}
              placeholder="Enter Username"
              className="rounded-full border w-full border-green-900 p-2"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={formHandle}
                ref={refSp}
                placeholder="Enter Password"
                className="rounded-full border w-full border-green-900 p-2"
                type="password"
                name="password"
                id="password"
              />
              <img
                ref={ref}
                onClick={showPassword}
                className="absolute right-2 top-3 cursor-pointer"
                width={20}
                src="/eye.svg"
                alt="eye"
              />
            </div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-400 text-white px-8 py-2 border-2 border-green-900 rounded-full flex justify-center items-center gap-2 w-fit"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-green-700 font-bold text-2xl py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto rounded-xl w-full overflow-hidden mb-4">
              <thead className="bg-green-700 text-white font-bold">
                <th className="py-4">Site</th>
                <th className="py-4">Username</th>
                <th className="py-4">Password</th>
                <th className="py-4">Actions</th>
              </thead>
              <tbody className="bg-green-300">
                {passwordArray.map((item) => {
                  return (
                    <tr key={uuidv4}>
                      <td className="py-2 border-2 border-white">
                        <div className="flex justify-center items-center gap-4">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="h-4 cursor-pointer"
                            src="/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white">
                        <div className="flex justify-center items-center gap-4">
                          <span>{item.username}</span>
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="h-4 cursor-pointer"
                            src="/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white">
                        <div className="flex justify-center items-center gap-4">
                          <span>{item.password}</span>
                          <img
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="h-4 cursor-pointer"
                            src="/copy.svg"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border-2 border-white">
                        <div className="flex justify-center items-center gap-4">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            src="/edit.svg"
                            alt="edit"
                            className="h-4 cursor-pointer"
                          />
                          <div
                            className=" h-5 cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
