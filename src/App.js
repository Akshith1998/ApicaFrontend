import { useState } from "react";
import styles from "./App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getValue, setKeyValue } from "./redux/lruSlice";

function App() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [values, setValues] = useState({
    Key: "",
    Value: "",
    Expiry: "",
  });
  const inputs = [
    {
      id: 1,
      name: "Key",
      type: "number",
      placeHolder: "enter a key",
    },
    {
      id: 2,
      name: "Value",
      type: "number",
      placeHolder: "enter a value",
    },
    {
      id: 3,
      name: "Expiry",
      type: "number",
      placeHolder: "enter expiry time",
    },
  ];
  const { value, CacheArr } = useSelector((state) => state.lru);
  const dispatch = useDispatch();
  const [operationType, setOperationType] = useState("GET");

  const handleSelect = (e) => {
    setOperationType(e.target.value);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (operationType === "GET") {
      if (values["Key"] !== "") {
        setErrorMessage(false);
        dispatch(getValue(values["Key"]));
      } else {
        setErrorMessage(true);
      }
    } else if (operationType === "POST") {
      if (
        values["Key"] !== "" &&
        values["Value"] !== "" &&
        values["Expiry"] !== ""
      ) {
        setErrorMessage(false);
        let body = {
          "key": values["Key"],
          "value": values["Value"],
          "expiryTime": values["Expiry"]
        }
        dispatch(setKeyValue(body));
      } else {
        setErrorMessage(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>LRU Cache Visualizer</div>
      <div className={styles.CacheWrapper}>
        {operationType==="GET" && value!==null && (
          <div className={styles.value}>{value===-1?"value not found":value}</div>
        )}
        {operationType==="POST" && CacheArr.length>0 && (
          <div className={styles.keyValueWrapper}>
            {CacheArr.map(item=>{
              return(
                <div className={styles.itemValue} id={item.Key}>{item.value}</div>
              )
            })}
          </div>
        )}
      </div>
      <div className={styles.operationsWrapper}>
        <div className={styles.operationsHeader}>Operations</div>
        <div className={styles.inputWrapper}>
          <div className={styles.selectDiv}>
            <label className={styles.label}>Select Operation</label>
            <select className={styles.select} onChange={handleSelect}>
              <option className={styles.option}>GET</option>
              <option className={styles.option}>POST</option>
            </select>
          </div>
          {operationType === "POST" &&
            inputs.map((input) => {
              return (
                <div className={styles.inputDiv}>
                  <label className={styles.label}>{input.name}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeHolder}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              );
            })}
          {operationType === "GET" && (
            <div className={styles.inputDiv}>
              <label className={styles.label}>{inputs[0].name}</label>
              <input
                type={inputs[0].type}
                name={inputs[0].name}
                placeholder={inputs[0].placeHolder}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          )}
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>
            please enter all the details
          </div>
        )}
        <div className={styles.buttonDiv}>
          <button className={styles.button} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
