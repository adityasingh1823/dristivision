import { useState } from "react";
import { predict } from "../api";

export default function Upload({ setResult }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await predict(formData);

    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl">
      <input type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && <img src={preview} alt="preview" className="mt-3 w-40" />}

      <button onClick={handleUpload}
        className="bg-blue-500 text-white p-2 mt-3 rounded">
        Upload
      </button>

      {loading && <p>Analyzing Image...</p>}
    </div>
  );
}