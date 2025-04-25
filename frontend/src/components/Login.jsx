// import React, { useState } from 'react';
// import { login } from '../services/api';
// import { useHistory } from 'react-router-dom';

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = await login(username, password);
//       setToken(token);
//       history.push('/');
//     } catch (error) {
//       setError('Login failed. Please check your credentials.');
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <h1 className="text-center">Login</h1>
//         {error && <p className="danger">{error}</p>}
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit" className="mt-1">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';  // Updated import

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Updated hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      setToken(token);
      navigate('/');  // Updated navigation method
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Login</h1>
        {error && <p className="danger">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="mt-1">Login</button>
      </form>
    </div>
  );
};

export default Login;
