import React from "react";

export interface Column<T> {
    header: string;
    accessor: keyof T;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface TableProps<T> {
    data: T[];
    columns?: Column<T>[];
    className?: string;
}

