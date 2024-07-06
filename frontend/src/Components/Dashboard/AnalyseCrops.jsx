import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { predictDisease } from "../../store/analyzeSoil";
import { langActions } from "../../store/languageSlice";

const AnalyseCrops = () => {
  const langData = useSelector(state => state.lang);
  const diseaseData = useSelector(state => state.soil);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const predictDiseaseHandler = () => {
    const formdata = new FormData();
    formdata.append("image", image);
    dispatch(predictDisease(formdata));
  };

  return (
    <div className="p-4 bg-gray-100 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Analyze Crops</h1>
        <div>
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-flex items-center"
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          >
            <i className="bi bi-file-earmark-arrow-up-fill mr-2"></i>
            Upload Image
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/2 text-center">
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-auto mb-4" />
          ) : (
            <h3 className="text-lg">No image uploaded</h3>
          )}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            onClick={predictDiseaseHandler}
          >
            Analyse
          </button>
        </div>
        <div className="w-1/2 ml-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Disease Name</h2>
          <p className="mb-4">
            {diseaseData.diseaseName
              ? `Disease Name: ${diseaseData.diseaseName}`
              : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo odio eu erat tempus, ut volutpat ligula consectetur. Aliquam sollicitudin nibh eros, tempus vehicula ex placerat a. Etiam augue tortor, euismod non consectetur eget, feugiat in purus. Nam quis elit lacus. Pellentesque in aliquet felis. Vivamus tincidunt vestibulum neque, ut faucibus ex molestie feugiat. Duis bibendum velit purus, sed vestibulum nibh ullamcorper placerat.`}
          </p>
          <h2 className="text-xl font-bold mb-2">Result</h2>
          <p>
            {diseaseData.solution
              ? `Solution: ${diseaseData.solution}\n Confidence: ${diseaseData.confidenceRate}`
              : langData.lang === "HI"
              ? `यहां आप किसी भी संभावित बीमारी या पौधों के संक्रमण के लिए अपनी फसलों का विश्लेषण कर सकते हैं और हमारे एमएल एल्गोरिथम के माध्यम से इसका समाधान प्राप्त कर सकते हैं, बस शीर्ष पर "अपलोड इमेज" बटन पर क्लिक करें और विश्लेषण विकल्प पर क्लिक करें।`
              : `Here you can analyse your crops for any possible diseases or plant infections and get a solution for that through our ML algorithm, just click the “upload image” button on the top and click Analyse option`}
          </p>
        </div>
      </div>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          if (langData.lang === "EN") {
            dispatch(langActions.changeLang("HI"));
          } else {
            dispatch(langActions.changeLang("EN"));
          }
        }}
      >
        Translate Text
      </button>
    </div>
  );
};

export default AnalyseCrops;
