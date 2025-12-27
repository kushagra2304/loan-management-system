export const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
  />
);
