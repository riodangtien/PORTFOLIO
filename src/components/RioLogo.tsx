const RioLogo = ({ className = "", spinning = false }: { className?: string; spinning?: boolean }) => (
  <div className={`rio-logo ${spinning ? "rio-logo-spinning" : ""} ${className}`} aria-label="Rio logo">
    <span className="rio-logo-corner rio-logo-corner-1" />
    <span className="rio-logo-corner rio-logo-corner-2" />
    <span className="rio-logo-corner rio-logo-corner-3" />
    <span className="rio-logo-corner rio-logo-corner-4" />
    <span className="rio-logo-diamond" />
  </div>
);

export default RioLogo;
