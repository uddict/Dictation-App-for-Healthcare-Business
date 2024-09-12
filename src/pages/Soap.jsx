import { SoapResponse } from "../lib/data";

const Soap = () => {
  const renderField = (key, value, depth = 0) => {
    const labelText = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className={`space-y-2 ${depth > 0 ? "ml-4" : ""}`}>
          <h3 className="text-lg font-semibold mt-4">{labelText}</h3>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderField(subKey, subValue, depth + 1)
          )}
        </div>
      );
    } else {
      return (
        <div key={key} className="space-y-2 text-[#172048]">
          <label htmlFor={key}>{labelText}:</label>
          {value.length > 100 ? (
            <textarea
              id={key}
              value={value}
              readOnly
              className="w-full h-24 border border-[#628FBC] rounded p-2 text-[#628FBC]/90"
            />
          ) : (
            <textarea
              type="text"
              rows={4}
              id={key}
              value={value}
              readOnly
              className="w-full border border-[#628FBC] rounded p-2 text-[#628FBC]/90"
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className="space-y-4 mx-[300px]">
      <div className="bg-[#F4FEFF] text-center text-[18px] py-4 text-[#172048] font-semibold">
        SOAP Notes
      </div>
      {Object.entries(SoapResponse.response).map(([key, value]) =>
        renderField(key, value)
      )}
    </div>
  );
};

export default Soap;
