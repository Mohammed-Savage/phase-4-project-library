import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

const Members = () => {
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

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once

  return (
    <>
     <NavBar/>
     <div className="container">
      {members.map((member) =>(
        <div key={member.id} style={{border:"1px solid"}}>
          {member.name}
          {member.email}
          {member.outstanding_balance}

        </div>
      ))}
     </div>
    </>
  );
};

export default Members;
