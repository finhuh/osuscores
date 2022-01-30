import React, { useRef } from "react";

const FileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null)
    let offset = 0;

    const parseInt8 = (dataView) => {
        return dataView.getInt8(offset++)
    };

    const parseInt16 = (dataView) => {
        let value =  dataView.getInt16(offset, true);
        offset += 2;
        return value;
    };

    const parseInt32 = (dataView) => {
        let value = dataView.getInt32(offset, true);
        offset += 4;
        return value;
    };

    const parseInt64 = (dataView) => {
        let value = dataView.getBigInt64(offset, true);
        offset += 8;
        return value;
    };

    const parseString = (dataView) => {
        if (dataView.getInt8(offset++) !== 11) return;

        let uleb128 = [];
        let value = 0;
        do {
            
            value = dataView.getInt8(offset++);
            var binary = (value).toString(2);
            while(binary.length < 8)
                binary = "0" + binary;

            uleb128.push(binary.slice(1, binary.length));
        } while (value > 127)

        uleb128.reverse();
        let stringLength = parseInt(uleb128.join(""), 2);

        let decoder = new TextDecoder("utf-8");
        let result = decoder.decode(dataView.buffer.slice(offset, offset + stringLength));
        offset += stringLength;
        return result;
    }

    const replayProps = [
        {
            name: "Game Mode",
            valueFunction: parseInt8
        },
        {
            name: "Osu! client version",
            valueFunction: parseInt32
        },
        {
            name: "Beatmap hash",
            valueFunction: parseString
        },
        {
            name: "Player name",
            valueFunction: parseString
        },
        {
            name: "Replay hash",
            valueFunction: parseString
        },
        {
            name: "300s",
            valueFunction: parseInt16
        },
        {
            name: "100s",
            valueFunction: parseInt16
        },
        {
            name: "50s",
            valueFunction: parseInt16
        },
        {
            name: "Gekis",
            valueFunction: parseInt16
        },
        {
            name: "Katus",
            valueFunction: parseInt16
        },
        {
            name: "Misses",
            valueFunction: parseInt16
        },
        {
            name: "Total score",
            valueFunction: parseInt32
        },
        {
            name: "Greatest combo",
            valueFunction: parseInt16
        },
        {
            name: "Perfect combo",
            valueFunction: parseInt8
        },
        {
            name: "Mods used",
            valueFunction: parseInt32
        },
        {
            name: "Life bar graph",
            valueFunction: parseString
        },
        {
            name: "Time stamp",
            valueFunction: parseInt64
        },
        {
            name: "Compressed replay length",
            valueFunction: parseInt32
        }
    ];


    const handleFileInput = (e) => {
        offset = 0;
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
     
        reader.onloadend= (e) => {
            var view = new DataView(e.target.result);
            for (let i = 0; i < replayProps.length; i++){
                console.log(replayProps[i].name + " " + replayProps[i].valueFunction(view));
            }
        }

        reader.onerror = (e) => {
           console.error("Failed to load replay.");
        };
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
        </div>
    )
}

export default FileUploader;