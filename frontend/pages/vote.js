import { useState } from "react";
import axios from "axios";
import { getContract } from "../utils/contracts";

export default function Vote() {
  const [aadhaar, setAadhaar] = useState("");
  const [msg, setMsg] = useState("");

  const verify = async () => {
    const res = await axios.post("http://localhost:5000/verify", { aadhaar });
    if (!res.data.eligible) {
      setMsg("Not in electoral roll");
      return;
    }

    const contract = await getContract();
    await contract.approveVoter(res.data.hash);
    setMsg("Approval submitted");
  };

  return (
    <>
      <input onChange={e => setAadhaar(e.target.value)} />
      <button onClick={verify}>Verify</button>
      <p>{msg}</p>
    </>
  );
}