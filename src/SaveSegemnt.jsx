import React, { useState } from "react";

const SaveSegment = () => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [schemaData, setSchemaData] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    { label: "First Name", value: "first_name", type: "User Traits" },
    { label: "Last Name", value: "last_name", type: "User Traits" },
    { label: "Gender", value: "gender", type: "User Traits" },
    { label: "Age", value: "age", type: "User Traits" },
    { label: "Account Name", value: "account_name", type: "Group Traits" },
    { label: "City", value: "city", type: "Group Traits" },
    { label: "State", value: "state", type: "Group Traits" },
  ]);
  const [show, setShow] = useState("");

  return (
    <div className="save-segment-container w-1/2 mx-auto bg-gray-50 p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Saving Segment</h2>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">
            Enter the Name of the Segment
          </label>
          <input
            type="text"
            style={{ border: "2px solid black" }}
            className="p-2"
            value={segmentName}
            onChange={(e) => {
              setSegmentName(e.target.value);
              setShow("");
            }}
            placeholder="Name of the segment"
          />
          <p className="text-red-500">{show}</p>
        </div>
        <div className="schemas">
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <div className="flex gap-4 justify-end">
            <div className="flex gap-1 items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>User Traits</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Group Traits</span>
            </div>
          </div>

          <div className="border-2 border-dashed p-4 rounded-md border-gray-300">
            {schemaData &&
              schemaData.map((s, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center w-full mt-2"
                >
                  <div
                    className={`w-2 h-2 ${
                      s.type === "User Traits" ? "bg-green-600" : "bg-red-600"
                    } rounded-full`}
                  ></div>
                  <select
                    className="w-[80%] p-3 rounded-e-sm bg-slate-100 border-dashed"
                    value={s.value}
                    onChange={(e) => {
                      setSchemaData((prevData) =>
                        prevData.map((item) =>
                          item.value === schemaData[index].value // Use the appropriate unique identifier
                            ? {
                                ...item,
                                label:
                                  e.target.options[e.target.selectedIndex].text,
                                value: e.target.value,
                                type: availableOptions.find(
                                  (value) => value.value === e.target.value
                                ).type,
                              }
                            : item
                        )
                      );
                    }}
                  >
                    <option value="">{s.label}</option>
                    {availableOptions
                      .filter(
                        (item) =>
                          !schemaData.find(
                            (item2) => item2.value === item.value
                          )
                      )
                      .map((value, index) => (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
          </div>
          <div className="w-full">
            <select
              name=""
              id="select-schema"
              style={{ border: "2px solid black", marginInline: "auto" }}
              className="p-2 bg-slate-100 mt-2 w-[80%]"
              onChange={(e) => {
                setSchemas([
                  availableOptions.find(
                    (value) => value.value === e.target.value
                  ),
                ]);
              }}
            >
              <option value="">Add to Schema to Segment</option>
              {availableOptions
                .filter(
                  (item) =>
                    !schemaData.find((item2) => item2.value === item.value)
                )
                .map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div
          className="text-green-700 text-sm underline-offset-4 underline decoration-green-700 hover:cursor-pointer"
          onClick={() => {
            setSchemaData((pre) => [...pre, ...schemas]);
            document.getElementById("select-schema").value = "";
          }}
        >
          + Add new schema
        </div>
        <div>
          <button
            className="bg-green-600 text-white p-2 rounded-md"
            onClick={() => {
              if (segmentName === "") {
                setShow("Please enter the segment name");
                return;
              }
              let data = {
                segment_name: segmentName,
                schema: schemaData.map((schema) => ({
                  [schema.value]: schema.label,
                })),
              };
              fetch(
                "https://webhook.site/3dba54e4-2808-4996-8c7f-619fd665b2e3",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              ).then((res) => {
                console.log(res, "res");
              });
              alert(`Segment saved successfully ${segmentName}`);
              alert(`Segment saved successfully ${segmentName}`);
              alert(`Segment saved successfully ${segmentName}`);

              setSegmentName("");
              setSchemas([]);
              setSchemaData([]);
              console.log(data, "data");
            }}
          >
            Save segment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveSegment;
