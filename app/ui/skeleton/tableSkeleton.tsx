export default function TableSkeleton() {
  return (
    <div className='w-full rounded-lg overflow-hidden '>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead>
            <tr className='bg-gray-500'>
              {[...Array(4)].map((_, index) => (
                <th key={index} className='px-6 py-3'>
                  <div className='h-4 bg-gray-300 rounded animate-pulse'></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(50)].map((_, rowIndex) => (
              <tr key={rowIndex} className='border-b border-gray-200'>
                {[...Array(4)].map((_, colIndex) => (
                  <td key={colIndex} className='px-6 py-4'>
                    <div className='h-3 bg-gray-300 rounded animate-pulse'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
