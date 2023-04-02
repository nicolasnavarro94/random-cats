import { useEffect, useState } from "react";
import Footer from "./components/footer";
const Cats = () => {
  const API_URL = `https://catfact.ninja/fact`;
  const GIF_URL = `https://api.giphy.com/v1/gifs/random?api_key=wHOUV41SRm7IjFubgq7FH2FdX2LKtMNQ&tag=cat&rating=g`;
  const LOADING_GIF = `https://usagif.com/wp-content/uploads/loading-4.gif`;
  const [fact, setFact] = useState(null);
  const [newFact, setNewFact] = useState(null);
  const [gif, setGif] = useState(null);

  const reload = () => {
    setGif(LOADING_GIF);
    fetch(API_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-CSRF-TOKEN": "SG1J0j0HalJt71YgdSkkwnQgt1gsNNyQptILB8C7",
      },
    })
      .then((response) => response.json())
      .then((data) => setFact(data));
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (fact !== null) {
      setNewFact(fact.fact.split(" ", 3).join(" "));

      fetch(GIF_URL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setGif(data.data.images.downsized_medium.url));
    }
  }, [fact]);

  return (
    fact,
    gif !== null && (
      <main>
        <section>
          <div className="cats">
            <div className="fact">
              <h2>Fact:</h2>
              <p>{newFact}</p>
            </div>
            <div className="img-container">
              <h1 className="title">RANDOM CATS</h1>
              <img src={gif} width="500px" height="300px"></img>
              <div className="fact-responsive">
                <h2>Fact:</h2>
                <p>{newFact}</p>
              </div>
              <div className="button-div">
                <button
                  onClick={() => {
                    reload();
                  }}
                  className="custom-button"
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  );
};

export default Cats;
