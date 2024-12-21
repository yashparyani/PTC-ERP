import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import FinalBlendCard from "./FinalBlendCard";

function FinalBlends() {
  const [fetchedBlends, setFetchedBlends] = useState([]);

  useEffect(() => {
    const fetchBlend = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.post(
          "http://localhost:5000/fetchblends",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure that the data contains the array of blends
        const blends = response.data.allblends || [];
        setFetchedBlends(blends);
      } catch (error) {
        console.error("Error fetching blends:", error.message);
        alert("Failed to fetch blends.");
      }
    };
    fetchBlend();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {fetchedBlends.length > 0 ? (
          fetchedBlends.map((blend, index) => (
            <FinalBlendCard key={index} blendObj={blend} />
          ))
        ) : (
          <p>No blends found.</p>
        )}
      </div>
    </div>
  );
}

export default FinalBlends;
