export const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);
