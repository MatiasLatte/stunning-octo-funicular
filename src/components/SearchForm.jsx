import { useState } from 'react';
import { Search, X } from 'lucide-react';

const NEIGHBORHOODS = [
    "Castropol", "La Linde", "San Lucas", "Balsos",
    "Avenida Poblado", "Avenida Las Vegas", "La Calera",
    "Transversal Inferior", "Transversal Superior", "Campestre",
    "Esmeraldal", "Cumbres", "Chocó", "Frontera",
    "Zúñiga", "Benedictinos"
];

export default function SearchForm({ onSearch, isLoading }) {
    const [filters, setFilters] = useState({
        min_price: '',
        max_price: '',
        min_area: '',
        max_area: '',
        neighborhoods: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleNeighborhoodToggle = (neighborhood) => {
        setFilters(prev => {
            const current = prev.neighborhoods;
            if (current.includes(neighborhood)) {
                return { ...prev, neighborhoods: current.filter(n => n !== neighborhood) };
            } else {
                return { ...prev, neighborhoods: [...current, neighborhood] };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    const clearForm = () => {
        setFilters({
            min_price: '',
            max_price: '',
            min_area: '',
            max_area: '',
            neighborhoods: []
        });
    };

    const formatcurrencyInput = (val) => {
        // Basic helper to show formatted value could be added here, 
        // but input type="number" is requested in prompt with placeholder.
        // Prompt says: "Use number inputs with placeholder showing example"
        return val;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Price Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        💰 Rango de Precios (COP)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Precio Mínimo</label>
                            <input
                                type="number"
                                name="min_price"
                                value={filters.min_price}
                                onChange={handleInputChange}
                                placeholder="Ej: 200000000"
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Precio Máximo</label>
                            <input
                                type="number"
                                name="max_price"
                                value={filters.max_price}
                                onChange={handleInputChange}
                                placeholder="Ej: 800000000"
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Area Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        📏 Área (m²)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Área Mínima</label>
                            <input
                                type="number"
                                name="min_area"
                                value={filters.min_area}
                                onChange={handleInputChange}
                                placeholder="Ej: 60"
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Área Máxima</label>
                            <input
                                type="number"
                                name="max_area"
                                value={filters.max_area}
                                onChange={handleInputChange}
                                placeholder="Ej: 200"
                                className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Neighborhoods Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        📍 Barrios (Selecciona varios)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {NEIGHBORHOODS.map(hood => (
                            <label key={hood} className={`
                flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors
                ${filters.neighborhoods.includes(hood)
                                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}
              `}>
                                <input
                                    type="checkbox"
                                    checked={filters.neighborhoods.includes(hood)}
                                    onChange={() => handleNeighborhoodToggle(hood)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium">{hood}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Search className="w-6 h-6" />
                                BUSCAR PROPIEDADES
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={clearForm}
                        className="px-6 py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-5 h-5" />
                        Limpiar Filtros
                    </button>
                </div>

            </form>
        </div>
    );
}
