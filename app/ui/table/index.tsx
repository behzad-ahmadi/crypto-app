import React from 'react';
import { TableProps, Column } from './types';

export default function Table<T extends object>({ data, columns, className = '' }: TableProps<T>) {
  // If columns are not provided, generate them from the first data item
  const tableColumns: Column<T>[] = columns || (
      Object.keys(data[0] || {}).map(key => ({
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        accessor: key as keyof T,
      }))
  );

  return (
      <div className={`overflow-x-auto ${className}`}>
        <table className="table table-zebra w-full">
          <thead>
          <tr>
            {tableColumns.map((column, index) => (
                <th key={index} className="bg-base-200">
                  {column.header}
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {tableColumns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.render
                          ? column.render(item[column.accessor], item)
                          : item[column.accessor] as React.ReactNode}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

