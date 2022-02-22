import React,{useState} from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  return (
    <div className="submit-form text-black">
      <div>
        <div className="form-group px-4 py-4 text-center">
          <label className="text-white px-4 py-4" htmlFor="user">Username:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group px-4 py-4 text-center">
        <label className="text-white px-11 py-4" htmlFor="id">ID:</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>
        <div className="text-center">
          <button onClick={login} className="text-white bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;