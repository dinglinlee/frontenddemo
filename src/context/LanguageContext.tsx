import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  languages: Language[];
  translate: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    uploadImages: 'Upload Satellite Images',
    dragDropImages: 'Drag & drop images here',
    supportedFormats: 'Supports JPEG, PNG, TIFF formats',
    selectFiles: 'Select Files',
    useSampleData: 'Use Sample Data',
    availableSamples: 'Available Sample Data',
    uploadImagesFirst: 'Upload images to begin GAN enhancement',
    ganEnhancement: 'GAN Image Enhancement',
    originalImage: 'Original Satellite Image',
    enhancedImage: 'GAN Enhanced Image',
    damageOverlay: 'Damage Overlay',
    startEnhancement: 'Start Enhancement',
    processing: 'Processing with GAN...',
    enhancementComplete: 'Enhancement Complete!',
    damageAreasDetected: 'Detected {{count}} damage areas',
    downloadEnhanced: 'Download Enhanced',
    damageSummary: 'AI Damage Summary',
    generateSummaryPrompt: 'Generate AI-powered damage assessment',
    generateSummary: 'Generate Summary',
    analyzingDamage: 'Analyzing damage patterns...',
    overallAssessment: 'Overall Assessment',
    severity: 'Severity',
    affectedArea: 'Affected Area',
    damageLevel: 'Damage Level',
    infrastructurePriority: 'Infrastructure Priority',
    units: 'units',
    damaged: 'damaged',
    priority: 'Priority',
    populationImpact: 'Population Impact',
    affected: 'Affected',
    displaced: 'Displaced',
    vulnerable: 'Vulnerable',
    vulnerabilityMap: 'Population Vulnerability Map',
    layers: 'Layers',
    riskLevel: 'Risk Level',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    highRiskZones: 'High Risk',
    mediumRiskZones: 'Medium Risk',
    lowRiskZones: 'Low Risk',
    coverage: 'Coverage',
    aiAssistant: 'GPT Multilingual Assistant',
    welcomeMessage: 'Hello! I can help you with disaster response operations. Ask me about evacuation routes, shelter locations, or resource allocation.',
    quickQuestions: 'Quick Questions',
    quickQuestion1: 'Evacuation routes?',
    quickQuestion2: 'Nearest shelter?',
    quickQuestion3: 'Medical facilities?',
    quickQuestion4: 'Supply distribution?',
    typeMessage: 'Type your message...',
    botEvacuationResponse: 'Based on current damage assessment, I recommend using Highway 9 north and Route 15 east as primary evacuation corridors. Avoid downtown area due to debris.',
    botShelterResponse: 'The nearest operational shelter is at Central High School (3.2km north). Capacity: 500 people. Contact: +1-555-0123',
    botMedicalResponse: 'Memorial Hospital (2.1km) is operational with emergency services. For urgent cases, helicopter landing zone is available at City Park.',
    botSupplyResponse: 'Supply distribution points: 1) Fire Station #3 (food, water) 2) Community Center (medical supplies) 3) School parking lot (emergency kits)',
    botDefaultResponse: 'I can help with evacuation routes, shelter information, medical facilities, supply distribution, and operational coordination. What specific information do you need?',
    downloadReports: 'Generate Reports',
    disasterReport: 'Haiti Earthquake Assessment',
    completed: 'Completed',
    selectFormats: 'Select Export Formats',
    itemsSelected: 'items selected',
    totalSize: 'Total size',
    generating: 'Generating...',
    download: 'Download Package',
    share: 'Share Report',
    downloadHelp: 'Reports include damage assessment, population impact analysis, and operational recommendations for field teams.',
    downloadStarted: 'Download started! Files will be saved to your downloads folder.'
  },
  es: {
    uploadImages: 'Subir Imágenes Satelitales',
    dragDropImages: 'Arrastra y suelta imágenes aquí',
    supportedFormats: 'Soporta formatos JPEG, PNG, TIFF',
    selectFiles: 'Seleccionar Archivos',
    useSampleData: 'Usar Datos de Muestra',
    availableSamples: 'Datos de Muestra Disponibles',
    uploadImagesFirst: 'Sube imágenes para comenzar mejora GAN',
    ganEnhancement: 'Mejora de Imagen GAN',
    originalImage: 'Imagen Satelital Original',
    enhancedImage: 'Imagen Mejorada con GAN',
    damageOverlay: 'Superposición de Daños',
    startEnhancement: 'Iniciar Mejora',
    processing: 'Procesando con GAN...',
    enhancementComplete: '¡Mejora Completada!',
    damageAreasDetected: 'Detectadas {{count}} áreas de daño',
    downloadEnhanced: 'Descargar Mejorada',
    damageSummary: 'Resumen de Daños IA',
    generateSummaryPrompt: 'Generar evaluación de daños con IA',
    generateSummary: 'Generar Resumen',
    analyzingDamage: 'Analizando patrones de daño...',
    overallAssessment: 'Evaluación General',
    severity: 'Severidad',
    affectedArea: 'Área Afectada',
    damageLevel: 'Nivel de Daño',
    infrastructurePriority: 'Prioridad de Infraestructura',
    units: 'unidades',
    damaged: 'dañado',
    priority: 'Prioridad',
    populationImpact: 'Impacto Poblacional',
    affected: 'Afectados',
    displaced: 'Desplazados',
    vulnerable: 'Vulnerables',
    vulnerabilityMap: 'Mapa de Vulnerabilidad Poblacional',
    layers: 'Capas',
    riskLevel: 'Nivel de Riesgo',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
    highRiskZones: 'Riesgo Alto',
    mediumRiskZones: 'Riesgo Medio',
    lowRiskZones: 'Riesgo Bajo',
    coverage: 'Cobertura',
    aiAssistant: 'Asistente Multilingüe GPT',
    welcomeMessage: '¡Hola! Puedo ayudarte con operaciones de respuesta a desastres. Pregúntame sobre rutas de evacuación, ubicaciones de refugios o asignación de recursos.',
    quickQuestions: 'Preguntas Rápidas',
    quickQuestion1: '¿Rutas de evacuación?',
    quickQuestion2: '¿Refugio más cercano?',
    quickQuestion3: '¿Instalaciones médicas?',
    quickQuestion4: '¿Distribución de suministros?',
    typeMessage: 'Escribe tu mensaje...',
    downloadReports: 'Generar Reportes',
    disasterReport: 'Evaluación Terremoto Haití',
    completed: 'Completado',
    selectFormats: 'Seleccionar Formatos de Exportación',
    download: 'Descargar Paquete',
    share: 'Compartir Reporte'
  },
  fr: {
    uploadImages: 'Télécharger Images Satellitaires',
    dragDropImages: 'Glissez et déposez les images ici',
    supportedFormats: 'Supporte les formats JPEG, PNG, TIFF',
    selectFiles: 'Sélectionner Fichiers',
    useSampleData: 'Utiliser Données Échantillon',
    availableSamples: 'Données Échantillon Disponibles',
    ganEnhancement: 'Amélioration Image GAN',
    aiAssistant: 'Assistant Multilingue GPT',
    welcomeMessage: 'Bonjour! Je peux vous aider avec les opérations de réponse aux catastrophes.',
    downloadReports: 'Générer Rapports',
    download: 'Télécharger Package',
    share: 'Partager Rapport'
  },
  ht: {
    uploadImages: 'Uploade Imaj Satelit yo',
    dragDropImages: 'Deplase ak lage imaj yo isit la',
    useSampleData: 'Sèvi ak Done Egzanp',
    ganEnhancement: 'Amelyorasyon Imaj GAN',
    aiAssistant: 'Asistan Multilingue GPT',
    welcomeMessage: 'Bonjou! Mwen ka ede w ak operasyon reponn nan katastwòf yo.',
    downloadReports: 'Jenere Rapò yo',
    download: 'Telechaje Package',
    share: 'Pataje Rapò'
  },
  ar: {
    uploadImages: 'تحميل صور الأقمار الصناعية',
    dragDropImages: 'اسحب وأفلت الصور هنا',
    useSampleData: 'استخدام بيانات عينة',
    ganEnhancement: 'تحسين صورة GAN',
    aiAssistant: 'مساعد GPT متعدد اللغات',
    welcomeMessage: 'مرحباً! يمكنني مساعدتك في عمليات الاستجابة للكوارث.',
    downloadReports: 'إنشاء التقارير',
    download: 'تحميل الحزمة',
    share: 'مشاركة التقرير'
  },
  zh: {
    uploadImages: '上传卫星图像',
    dragDropImages: '拖拽图片到这里',
    useSampleData: '使用示例数据',
    ganEnhancement: 'GAN图像增强',
    aiAssistant: 'GPT多语言助手',
    welcomeMessage: '您好！我可以帮助您进行灾害响应操作。',
    downloadReports: '生成报告',
    download: '下载包',
    share: '分享报告'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
  };

  const translate = (key: string, params?: Record<string, any>): string => {
    let text = translations[currentLanguage]?.[key] || translations.en[key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{{${param}}}`, String(params[param]));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      languages,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};