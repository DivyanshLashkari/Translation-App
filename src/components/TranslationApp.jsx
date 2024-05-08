import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";

const TranslationApp = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("hi");
  const [languages, setlanguages] = useState([]);



  const handleChange = (e) => {
    setText(e.target.value);
  };

  const options = {
    method: "GET",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "cc4f7014f1msh5db08969209dfeap177974jsn3abd31f281ef",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  const api = async () => {
    console.log("hello");
    try {
      const response = await axios(options);
      console.log(response.data.data.languages);
      setlanguages(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    api();
  }, []);
  console.log(languages);

  const translate = async () => {
    console.log("source", source, "target", target, "text", text);

    const encodedParams = new URLSearchParams();

    encodedParams.set("source", source);
    encodedParams.set("target", target);
    encodedParams.set("q", text);

    console.log(source, target, text);

    const option = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "cc4f7014f1msh5db08969209dfeap177974jsn3abd31f281ef",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios(option);
      console.log("data======>", response.data);
      setTranslation(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("error ==========>", error);
    }
  };

  const handleSource = (e) => {
    setSource(e.target.value);
  };

  const handleTarget = (e) => {
    setTarget(e.target.value);
    console.log("target=====>", e.target.value);
  };

  console.log(source, target);

  return (
    <div
      style={{
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
        padding: "20px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#444", margin: "10px 0" }}>
        Google Translate App
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "20px",
            width: "400px",
            paddingTop:"35px",
            paddingBottom:"35px",

          }}
        >
          <div style={{ backgroundColor: "#fafafa", padding: "10px" }}>
            <select
              value={source}
              onChange={handleSource}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {languages &&
                languages?.map((item, index) => {
                  return (
                    <>
                      <option value={item.language}>{item.language}</option>
                    </>
                  );
                })}
            </select>
          </div>
          <div style={{ padding: "10px" }}>
            <input
              placeholder="input the text to translate"
              value={text}
              onChange={handleChange}
              name={text}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "20px",
            width: "400px",
          }}
        >
          <div style={{ backgroundColor: "#fafafa", padding: "10px" }}>
            <select
              onChange={handleTarget}
              value={target}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              {languages &&
                languages?.map((item, index) => {
                  return (
                    <>
                      <option value={item.language}>{item.language}</option>
                    </>
                  );
                })}
            </select>
          </div>
          <div style={{ padding: "10px" }}>
            <input
              placeholder="translated text will appear here"
              value={translation}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(translation);
              }}
              style={{
                backgroundColor: "#444",
                color: "white",
                border: "1px solid #444",
                borderRadius: "5px",
                padding: "5px 10px",
                marginTop: "5px",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={translate}
        style={{
          backgroundColor: "#444",
          color: "white",
          border: "1px solid #444",
          borderRadius: "5px",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        Translate
      </button>
    </div>
  );
};

export default TranslationApp;
