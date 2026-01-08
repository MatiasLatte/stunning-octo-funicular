import { MapPin, BedDouble, Bath, ExternalLink, ImageOff } from 'lucide-react';
import { useState } from 'react';

export default function PropertyCard({ property }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-64 bg-gray-200">
                {!imgError && property.image_url ? (
                    <img
                        src={property.image_url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <ImageOff className="w-12 h-12 mb-2" />
                        <span className="text-sm">Imagen no disponible</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {property.zone}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2" title={property.title}>
                        {property.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                    </div>
                </div>

                <div className="mt-2 mb-4">
                    <span className="text-2xl font-bold text-blue-700 block">
                        {property.price}
                    </span>
                    <span className="text-gray-500 font-medium text-sm">
                        {property.area}
                    </span>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-6 mb-6 text-gray-600">
                    <div className="flex items-center gap-2" title="Habitaciones">
                        <BedDouble className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{property.bedrooms}</span>
                        <span className="text-xs">Habs</span>
                    </div>
                    <div className="flex items-center gap-2" title="Baños">
                        <Bath className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">{property.bathrooms}</span>
                        <span className="text-xs">Baños</span>
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <a
                        href={property.wasi_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-slate-50 hover:bg-slate-100 text-blue-700 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-blue-200"
                    >
                        Ver en Wasi
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
