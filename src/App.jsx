import { useState } from 'react'
import { Building2 } from 'lucide-react'
import SearchForm from './components/SearchForm'
import PropertyCard from './components/PropertyCard'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (filters) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)
    setResults(null)

    try {
      const queryParams = new URLSearchParams()

      if (filters.min_price) queryParams.append('min_price', filters.min_price)
      if (filters.max_price) queryParams.append('max_price', filters.max_price)
      if (filters.min_area) queryParams.append('min_area', filters.min_area)
      if (filters.max_area) queryParams.append('max_area', filters.max_area)

      if (filters.neighborhoods && filters.neighborhoods.length > 0) {
        queryParams.append('neighborhoods', filters.neighborhoods.join(','))
      }

      // Defaults from requirements
      queryParams.append('for_sale', 'true')
      queryParams.append('for_rent', 'false')

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // Fallback for safety
      const response = await fetch(`${apiUrl}/search?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error(err)
      setError('Hubo un problema al buscar las propiedades. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 shadow-md mb-8">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg text-blue-700">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Buscador de Propiedades</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600">
            Encuentra tu próximo hogar en El Poblado y alrededores
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {/* Results Section */}
        <div className="mt-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-500 text-lg">Buscando las mejores opciones...</p>
            </div>
          )}

          {!loading && results && (
            <div className="animate-fade-in">
              <div className="flex items-baseline justify-between mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Resultados
                </h2>
                <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-1 rounded-full">
                  {results.total} {results.total === 1 ? 'Propiedad encontrada' : 'Propiedades encontradas'}
                </span>
              </div>

              {results.properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                  <p className="text-gray-500 text-xl">
                    No se encontraron propiedades con estos filtros.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Intenta ampliar el rango de precio o seleccionar más barrios.
                  </p>
                </div>
              )}
            </div>
          )}

          {!loading && !hasSearched && (
            <div className="text-center py-20 opacity-50">
              <Building2 className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-xl">Usa el formulario para empezar a buscar</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
