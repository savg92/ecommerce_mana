import React from 'react'

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5C100 78.2051 78.2051 100 50.5 100C22.7949 100 1 78.2051 1 50.5C1 22.7949 22.7949 1 50.5 1C78.2051 1 100 22.7949 100 50.5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M91.5 50.5C91.5 73.1846 73.1846 91.5 50.5 91.5C27.8154 91.5 9.5 73.1846 9.5 50.5C9.5 27.8154 27.8154 9.5 50.5 9.5C73.1846 9.5 91.5 27.8154 91.5 50.5Z"
          stroke="currentFill"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default loading