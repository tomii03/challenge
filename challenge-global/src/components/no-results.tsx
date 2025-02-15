
export function NoResults() {
  return (
    <div className="no-results">
      <p className="no-results-text">
        No se encontraron productos
      </p>
      <p className="no-results-suggestion">
        No hay productos que coincidan con tu busqueda.
      </p>
      <p className="no-results-suggestion">
      Intenta ajustar tus filtros o verifica que el nombre que estas buscando sea correcto
      </p>
    </div>
  )
} 