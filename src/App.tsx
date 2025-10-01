import { useState } from "react";
import JsonInput from "./components/JsonInput";
import { useProcessor } from "./hooks/useProcessor";
import Tables from "./components/Tables";

function App() {
    const [jsonValue, setJsonValue] = useState<Record<string, unknown> | null>(
        null
    );
    const { inspections, failureReports, failedMessages, error, runProcess } =
        useProcessor();

    const handleProcess = () => {
        runProcess(jsonValue);
    };

    const totalProcessedMessage = inspections?.length + failureReports?.length;

    return (
        <>
            <div className="flex flex-col items-center justify-center px-5 w-full">
                <h1 className="text-2xl font-bold mb-10">Recruitment Task</h1>
                <JsonInput onChange={setJsonValue} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8 cursor-pointer"
                    onClick={handleProcess}
                >
                    Process Input
                </button>
                {error && <p className="text-red-500 text-sm ">{error}</p>}
                <div className="mt-2">
                    <div>Total Processed Message: {totalProcessedMessage}</div>
                    <div>Number of Inspections: {inspections?.length}</div>
                    <div>
                        Number of Failed Reports: {failureReports?.length}
                    </div>
                    <div>
                        Number of Messages not Processed:{" "}
                        {failedMessages?.length}
                    </div>
                </div>
            </div>

            <Tables
                inspections={inspections}
                failureReports={failureReports}
                failedMessages={failedMessages}
            />
        </>
    );
}

export default App;
