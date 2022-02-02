import React from 'react'
import { emptyIcon } from '../../icons'

export const Empty: React.FC = () => {
  return (
    <div className="flex flex-col">
      <img src={emptyIcon} className="h-36 w-36 lg:h-48 lg:w-48 self-center" />
      <h2 className="text-xl lg:text-3xl" style={{ color: "#535353" }}>
        Aucune recette trouvée
      </h2>
    </div>
  )
}
