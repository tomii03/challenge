export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .trim()
}

export function searchInText(searchTerm: string, textToSearch: string): boolean {
  const normalizedSearch = normalizeText(searchTerm)
  const normalizedText = normalizeText(textToSearch)
  
  // Si la búsqueda está vacía, devuelve true
  if (!normalizedSearch) return true
  
  // Divide la búsqueda en palabras
  const searchWords = normalizedSearch.split(/\s+/)
  
  // Verifica si todas las palabras de búsqueda están en el texto
  return searchWords.every(word => normalizedText.includes(word))
} 