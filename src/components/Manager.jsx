import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const ref = useRef();
  const passwordRef = useRef();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eyecross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 0 &&
      form.username.length > 0 &&
      form.password.length > 0
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setform({ site: "", username: "", password: "" });

      toast("Saved!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer>
        position="top-right" autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light" transition=
        "Bounce"
      </ToastContainer>
      ;
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(34,197,94,.21)_100%)]"></div>
      <div className=" mx-auto my-5 max-w-4xl p-5  ">
        <div className="flex justify-center">
          <span className="text-green-600 text-2xl font-bold">&lt;</span>
          <div className="logo font-bold text-2xl">Pass</div>
          <span className="text-green-600 text-2xl font-bold">OP/&gt;</span>
        </div>
        <p className="text-center text-lg text-green-500">
          Your own password manager
        </p>
        <div className=" flex flex-col p-4 gap-3 ">
          <input
            className="rounded-full text-lg border  border-green-500 px-4 py-1 w-full"
            type="text"
            name="site"
            id="site"
            placeholder="Enter website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex gap-4 relative">
            <input
              className="rounded-full text-lg border  border-green-500 px-4 py-1 w-full"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              className="rounded-full text-lg border  border-green-500 px-4 py-1 w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              ref={passwordRef}
            />
            <span
              className="absolute right-4 top-[9px] cursor-pointer"
              onClick={showPassword}
            >
              <img ref={ref} width={20} src="/eye.png" alt="eye" />
            </span>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center hover:bg-green-300 w-36 mx-auto items-center rounded-full gap-2  border border-green-900 bg-green-500 px-4 py-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to display</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 overflow-scroll">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-1/2 ">
                        <div className="flex gap-1 justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer py-1"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img width={20} src="/copy.png" alt="" />
                          </div>
                        </div>
                      </td>

                      <td className="py-2  border  border-white text-center ">
                        <div className="flex gap-1 justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="size-7 cursor-pointer py-1"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img width={20} src="/copy.png" alt="" />
                          </div>
                        </div>
                      </td>

                      <td className="py-2  border border-white text-center ">
                        <div className="flex gap-1 justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="size-7 cursor-pointer py-1"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img width={20} src="/copy.png" alt="" />
                          </div>
                        </div>
                      </td>

                      <td className="py-2  border border-white text-center ">
                        <div className="flex">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/ogkflacg.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
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
