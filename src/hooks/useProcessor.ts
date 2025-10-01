import { useState } from "react";
import { processInput, type ProcessResult } from "../util/processInput";

export function useProcessor() {
    const [result, setResult] = useState<ProcessResult>({
        inspections: [],
        failureReports: [],
        failedMessages: [],
    });

    const runProcess = (jsonValue: unknown) => {
        const processed = processInput(jsonValue);
        setResult(processed);
    };

    return {
        ...result,
        runProcess,
    };
}
