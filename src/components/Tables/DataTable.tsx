import React from "react";

type Column<T> = {
    header: string;
    accessor: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    title: string;
    columns: Column<T>[];
    data: T[];
};

export function DataTable<T>({ title, columns, data }: DataTableProps<T>) {
    return (
        <div className="mb-6 ">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="border px-2 py-1 text-left text-nowrap"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="border px-2 py-1 text-center"
                                >
                                    No records
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="border px-2 py-1"
                                        >
                                            {col.accessor(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
