import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [prenom, setPernom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState('client');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refresh

    await signup(nom, prenom, telephone, email, mdp, role);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup form</h3>

      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          <label>Nom: </label>
          <input
            type="text"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div>
          <label>Prenom: </label>
          <input
            type="text"
            onChange={(e) => setPernom(e.target.value)}
            value={prenom}
          />
        </div>
      </div>
      <label>Tel: </label>
      <input
        type="text"
        onChange={(e) => setTelephone(e.target.value)}
        value={telephone}
      />

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={mdp}
      />

      <div>
        <label>Role: </label>
        <select onChange={(e) => setRole(e.target.value)} value={role}> 
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button disabled={isLoading}>Sign up</button>
      <a href="/Login">Already have an account?</a>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
