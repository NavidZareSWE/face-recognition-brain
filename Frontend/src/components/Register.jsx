import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
const Register = () => {
  const { navigate, BACKEND_URL, loadUser } = useContext(AppContext);
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [registerName, setName] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };




  const onRegister = async (e) => {
    e.preventDefault();
    fetch(BACKEND_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName
      }),
    })
    .then((response) => response.json())
    .then((user) => {
      if (user.id){
      loadUser(user)
        navigate("/home");
      }
      else console.log(user);
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center py-3 lg:px-8">
        <div className="bg-white p-7 bg-opacity-70 rounded-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              style={{
                filter: "brightness(0) saturate(100%)",
              }}
              alt="Your Company"
              src="brain.svg"
              className="mx-auto w-16"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Register an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={registerName}
                    onChange={onNameChange}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md bg-slate-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={registerEmail}
                    onChange={onEmailChange}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-slate-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={onPasswordChange}
                    value={registerPassword}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-slate-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => onRegister(e)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
