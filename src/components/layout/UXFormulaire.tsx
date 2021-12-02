import { Widget } from '@typeform/embed-react'

interface UXFormulaire {
  className?: string;
}

export const UXFormulaire: React.FC<UXFormulaire> = ({ className }) => {
  return (
    <div className={`w-4/5 md:w-2/3 h-screen ${className}`}>
        <Widget id="NsXUOECV" className="h-3/5 shadow-xl rounded-xl" />
    </div>
  );
};