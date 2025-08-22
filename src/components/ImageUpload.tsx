import React, { useState } from 'react';
import { Upload, Image, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface ImageUploadProps {
  onUpload: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [dragOver, setDragOver] = useState(false);
  const { setImages } = useData();
  const { translate } = useLanguage();

  const mockImages = [
    {
      id: '1',
      name: 'Haiti Earthquake - Pre Disaster',
      date: '2023-08-15',
      location: 'Port-au-Prince, Haiti',
      url: 'https://images.pexels.com/photos/87611/earth-blue-planet-globe-planet-87611.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'pre'
    },
    {
      id: '2', 
      name: 'Haiti Earthquake - Post Disaster',
      date: '2023-08-20',
      location: 'Port-au-Prince, Haiti',
      url: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'post'
    }
  ];

  const handleSelectMockData = () => {
    setImages(mockImages);
    onUpload();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
    handleSelectMockData();
  };

  return (
    <div className="glass rounded-xl shadow-2xl p-6 transition-all-smooth hover:shadow-neon-blue/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Upload className="w-5 h-5 mr-2 text-neon-blue" />
        {translate('uploadImages')}
      </h3>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-neon-blue bg-neon-blue/10' 
            : 'border-white/20 hover:border-neon-blue/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          {translate('dragDropImages')}
        </h4>
        <p className="text-gray-400 mb-4">
          {translate('supportedFormats')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-4 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-all-smooth neon-blue">
            {translate('selectFiles')}
          </button>
          <button 
            onClick={handleSelectMockData}
            className="px-4 py-2 bg-neon-orange text-white rounded-lg hover:bg-neon-orange/80 transition-all-smooth neon-orange"
          >
            {translate('useSampleData')}
          </button>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="mt-6">
        <h4 className="font-medium text-white mb-3">{translate('availableSamples')}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockImages.map((image) => (
            <div key={image.id} className="flex items-center space-x-3 p-3 glass-dark rounded-lg hover:bg-white/10 transition-all-smooth">
              <img 
                src={image.url} 
                alt={image.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-sm text-white truncate">{image.name}</h5>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{image.date}</span>
                  <MapPin className="w-3 h-3 ml-2" />
                  <span className="truncate">{image.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;