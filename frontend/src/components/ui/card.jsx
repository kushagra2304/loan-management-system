export const Card = ({ children, className }) => (
  <div className={`bg-white p-4 shadow rounded ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <h3 className={`font-bold text-lg mb-2 ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
