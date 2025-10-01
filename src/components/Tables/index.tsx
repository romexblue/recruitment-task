import type {
    FailedMessage,
    FailureReport,
    Inspection,
} from "../../util/processInput";
import { DataTable } from "./DataTable";

type Props = {
    inspections: Inspection[];
    failureReports: FailureReport[];
    failedMessages: FailedMessage[];
};

export default function Tables({
    inspections,
    failureReports,
    failedMessages,
}: Props) {
    return (
        <div className="px-5">
            {/* Inspections */}
            <DataTable<Inspection>
                title="Inspections"
                data={inspections}
                columns={[
                    {
                        header: "Description",
                        accessor: (row) => row.description,
                    },
                    {
                        header: "Type",
                        accessor: (row) => row.type,
                    },
                    {
                        header: "Inspection Date",
                        accessor: (row) => row.inspectionDate,
                    },
                    {
                        header: "Week of Year",
                        accessor: (row) => row.weekOfYear,
                    },
                    { header: "Status", accessor: (row) => row.status },
                    {
                        header: "Recommendations",
                        accessor: (row) => row.recommendations,
                    },
                    {
                        header: "Client Phone",
                        accessor: (row) => row.clientPhone ?? "",
                    },
                    {
                        header: "Created At",
                        accessor: (row) => row.createdAt ?? "",
                    },
                ]}
            />

            {/* Failure Reports */}
            <DataTable<FailureReport>
                title="Failure Reports"
                data={failureReports}
                columns={[
                    {
                        header: "Description",
                        accessor: (row) => row.description,
                    },
                    {
                        header: "Type",
                        accessor: (row) => row.type,
                    },
                    {
                        header: "Priority",
                        accessor: (row) => row.priority,
                    },
                    {
                        header: "Service Visit Date",
                        accessor: (row) => row.serviceVisitDate,
                    },
                    { header: "Status", accessor: (row) => row.status },
                    {
                        header: "Service Notes",
                        accessor: (row) => row.serviceNotes,
                    },
                    {
                        header: "Client Phone",
                        accessor: (row) => row.clientPhone ?? "",
                    },
                    {
                        header: "Created At",
                        accessor: (row) => row.createdAt ?? "",
                    },
                ]}
            />

            {/* Failed Messages */}
            <DataTable<FailedMessage>
                title="Failed Messages"
                data={failedMessages}
                columns={[
                    {
                        header: "Number",
                        accessor: (row) => row.message?.number,
                    },
                    {
                        header: "Reason",
                        accessor: (row) => row.reason,
                    },
                ]}
            />
        </div>
    );
}
