import Jweet from "Components/Jweet";
import JweetCreator from "Components/JweetCreator";
import { dbService } from "myFirebase";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJweets(jweetArray);
      });
  }, []);

  return (
    <div className="container">
      <JweetCreator userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {jweets.map((jweet) => (
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
