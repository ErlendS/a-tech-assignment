import * as React from "react";
import "./App.css";
const DisplayRow = React.lazy(() => import("./componets"));

const API_URL =
  "https://storage.googleapis.com/aller-structure-task/test_data.json";

const DisplayGrid = props => {
  const { apiData } = props;
  return (
    <div id="articleContainer" className={`flex flex-col`}>
      {apiData.map((columnsObj, i) => {
        return <DisplayRow key={i} columns={columnsObj.columns} />;
      })}
    </div>
  );
};

const App = () => {
  const [apiData, setApiData] = React.useState();

  React.useEffect(() => {
    async function getData() {
      await fetch(API_URL)
        .then(res => res.json())
        .then(_data => {
          setApiData(_data[0]);
        })
        .catch(err => console.log("error", err));
    }
    getData();
  }, []);

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <React.Suspense fallback={<div>Loading...</div>}>
        {apiData && <DisplayGrid apiData={apiData} />}
      </React.Suspense>
    </div>
  );
};

export default App;
