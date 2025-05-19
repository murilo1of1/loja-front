export default function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black' }}>
      {children}
    </div>
  );
}