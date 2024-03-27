import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

export default function MemberPage() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/members");
        const data = await response.json();
        // Update state with fetched data
        setMembers(data);
      } catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }

    fetchData();
  }, []); 

  
  return (
    <>
      <NavBar />
      <div className="container" style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr"}}>
        {members.map((member) => (
          <div className="member-card" key={member.id} style={{ border: "1px solid", borderRadius:"25px", margin:"5px", height: "200px", width:"200px"}}>
            <p style={{textAlign:"center"}}>Name: {member.name}</p>
            <p style={{textAlign:"center"}}>Email: {member.email}</p>
            <p style={{textAlign:"center"}}>Outstanding Balance: ${member.outstanding_balance}</p>
          </div>
        ))}
      </div>
    </>
  )
};
