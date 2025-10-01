import { parseISO, isValid, format, getISOWeek } from "date-fns";

export type InputMessage = {
    number: number;
    description: string;
    dueDate?: string;
    phone?: string;
    createdAt?: string;
};

export type Inspection = {
    description: string;
    type: "inspection";
    inspectionDate: string;
    weekOfYear: number | string;
    status: "scheduled" | "new";
    recommendations: string;
    clientPhone: string;
    createdAt?: string;
};

export type FailureReport = {
    description: string;
    type: "failure_report";
    priority: "critical" | "high" | "normal";
    serviceVisitDate: string;
    status: "appointment" | "new";
    serviceNotes: string;
    clientPhone: string;
    createdAt?: string;
};

export type ProcessResult = {
    inspections: Inspection[];
    failureReports: FailureReport[];
    failedMessages: FailedMessage[];
    error?: string;
};

export type FailedMessage = {
    message: InputMessage;
    reason: string;
};

const cleanPhone = (phone?: string): string => {
    if (!phone) return "";
    return phone.trim().replace(/^"+|"+$/g, "");
};

export function processInput(jsonValue: unknown): ProcessResult {
    if (!Array.isArray(jsonValue)) {
        return {
            inspections: [],
            failureReports: [],
            failedMessages: [],
            error: "Given JSON is not an array",
        };
    }

    const allObjects = jsonValue.every(
        (item) =>
            item !== null && typeof item === "object" && !Array.isArray(item)
    );

    if (!allObjects) {
        return {
            inspections: [],
            failureReports: [],
            failedMessages: [],
            error: "All items in the array must be objects",
        };
    }

    const inspections: Inspection[] = [];
    const failureReports: FailureReport[] = [];
    const failedMessages: FailedMessage[] = [];

    const processedDescriptions = new Set<string>();

    (jsonValue as InputMessage[]).forEach((msg) => {
        if (!msg.description || msg.description.trim() === "") {
            failedMessages.push({
                message: msg,
                reason: "Message description is missing or empty.",
            });
            return;
        }

        //prevents duplicates
        if (processedDescriptions.has(msg.description)) {
            return;
        }

        processedDescriptions.add(msg.description);

        if (/przegląd/i.test(msg.description)) {
            // inspection
            let inspectionDate = "";
            let week: number | string = "";
            let status: "scheduled" | "new" = "new";

            if (msg.dueDate) {
                const parsedDate = parseISO(msg.dueDate);
                if (isValid(parsedDate)) {
                    inspectionDate = format(parsedDate, "yyyy-MM-dd");
                    week = getISOWeek(parsedDate);
                    status = "scheduled";
                }
            }

            inspections.push({
                description: msg.description,
                type: "inspection",
                inspectionDate,
                weekOfYear: week,
                status,
                recommendations: "",
                clientPhone: cleanPhone(msg.phone),
                createdAt: msg.createdAt,
            });
        } else {
            // failure_report
            let status: "appointment" | "new" = "new";
            let serviceVisitDate = "";
            if (msg.dueDate) {
                const parsedDate = parseISO(msg.dueDate);
                if (isValid(parsedDate)) {
                    serviceVisitDate = format(parsedDate, "yyyy-MM-dd");
                    status = "appointment";
                }
            }

            let priority: "critical" | "high" | "normal" = "normal";
            if (/bardzo pilne/i.test(msg.description)) {
                priority = "critical";
            } else if (/pilne/i.test(msg.description)) {
                priority = "high";
            }

            failureReports.push({
                description: msg.description,
                type: "failure_report",
                priority,
                serviceVisitDate,
                status,
                serviceNotes: "",
                clientPhone: cleanPhone(msg.phone),
                createdAt: msg.createdAt,
            });
        }
    });

    return { inspections, failureReports, failedMessages, error: undefined };
}
