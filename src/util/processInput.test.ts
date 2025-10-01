import { processInput } from "./processInput";

describe("processInput", () => {
    it("should return inspection if description contains 'przegląd' with valid dueDate", () => {
        const input = [
            {
                number: 1,
                description: "Przegląd instalacji",
                dueDate: "2025-10-05",
                phone: "123456",
            },
        ];

        const result = processInput(input);

        expect(result.inspections).toHaveLength(1);
        expect(result.inspections[0].status).toBe("scheduled");
        expect(result.inspections[0].inspectionDate).toBe("2025-10-05");
        expect(result.inspections[0].weekOfYear).toBeGreaterThan(0);
        expect(result.failureReports).toHaveLength(0);
    });

    it("should set inspectionDate empty and status=new if dueDate is missing", () => {
        const input = [{ number: 2, description: "Przegląd windy" }];

        const result = processInput(input);

        expect(result.inspections).toHaveLength(1);
        expect(result.inspections[0].status).toBe("new");
        expect(result.inspections[0].inspectionDate).toBe("");
    });

    it("should create failure_report with status=appointment when dueDate valid", () => {
        const input = [
            {
                number: 3,
                description: "Awaria prądu",
                dueDate: "2025-12-01",
            },
        ];

        const result = processInput(input);

        expect(result.failureReports).toHaveLength(1);
        expect(result.failureReports[0].status).toBe("appointment");
        expect(result.failureReports[0].serviceVisitDate).toBe("2025-12-01");
    });

    it("should set failure_report status=new when dueDate missing", () => {
        const input = [{ number: 4, description: "Awaria internetu" }];

        const result = processInput(input);

        expect(result.failureReports).toHaveLength(1);
        expect(result.failureReports[0].status).toBe("new");
        expect(result.failureReports[0].serviceVisitDate).toBe("");
    });

    it("should set priority=critical if description contains 'bardzo pilne'", () => {
        const input = [
            { number: 5, description: "Awaria ogrzewania - bardzo pilne" },
        ];

        const result = processInput(input);

        expect(result.failureReports).toHaveLength(1);
        expect(result.failureReports[0].priority).toBe("critical");
    });

    it("should set priority=high if description contains 'pilne'", () => {
        const input = [
            { number: 6, description: "Awaria klimatyzacji - pilne" },
        ];

        const result = processInput(input);

        expect(result.failureReports).toHaveLength(1);
        expect(result.failureReports[0].priority).toBe("high");
    });

    it("should set priority=normal if no urgency keywords found", () => {
        const input = [{ number: 7, description: "Awaria domofonu" }];

        const result = processInput(input);

        expect(result.failureReports).toHaveLength(1);
        expect(result.failureReports[0].priority).toBe("normal");
    });

    it("should skip duplicate descriptions", () => {
        const input = [
            { number: 8, description: "Przegląd instalacji" },
            { number: 9, description: "Przegląd instalacji" },
        ];

        const result = processInput(input);

        expect(result.inspections).toHaveLength(1);
    });

    it("should push to failedMessages if description is missing", () => {
        const input = [{ number: 10, description: "" }];

        const result = processInput(input);

        expect(result.failedMessages).toHaveLength(1);
    });
});
