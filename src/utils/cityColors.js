// Mapování měst na jejich barvy
export const cityColors = {
  // Opava - modrá
  'Opava': 'from-blue-500 to-blue-600',
  'Opavy': 'from-blue-500 to-blue-600',
  'Opavě': 'from-blue-500 to-blue-600',
  'Opavu': 'from-blue-500 to-blue-600',
  
  // Ostrava - hnědá (amber)
  'Ostrava': 'from-amber-600 to-amber-700',
  'Ostravy': 'from-amber-600 to-amber-700',
  'Ostravě': 'from-amber-600 to-amber-700',
  'Ostravu': 'from-amber-600 to-amber-700',
  
  // Nový Jičín - zelená
  'Nový Jičín': 'from-green-500 to-green-600',
  'Nového Jičína': 'from-green-500 to-green-600',
  'Novém Jičíně': 'from-green-500 to-green-600',
  'Novému Jičínu': 'from-green-500 to-green-600',
  
  // Frýdek-Místek - fialová
  'Frýdek-Místek': 'from-purple-500 to-purple-600',
  'Frýdku-Místku': 'from-purple-500 to-purple-600',
  'Frýdku-Místku': 'from-purple-500 to-purple-600',
  'Frýdek-Místku': 'from-purple-500 to-purple-600',
  
  // Karviná - červená
  'Karviná': 'from-red-500 to-red-600',
  'Karviné': 'from-red-500 to-red-600',
  'Karvinné': 'from-red-500 to-red-600',
  'Karvinou': 'from-red-500 to-red-600',
  
  // Havířov - indigo
  'Havířov': 'from-indigo-500 to-indigo-600',
  'Havířova': 'from-indigo-500 to-indigo-600',
  'Havířově': 'from-indigo-500 to-indigo-600',
  'Havířovu': 'from-indigo-500 to-indigo-600',
  
  // Třinec - tyrkysová (teal)
  'Třinec': 'from-teal-500 to-teal-600',
  'Třince': 'from-teal-500 to-teal-600',
  'Třinci': 'from-teal-500 to-teal-600',
  'Třincem': 'from-teal-500 to-teal-600',
  
  // Český Těšín - růžová
  'Český Těšín': 'from-pink-500 to-pink-600',
  'Českého Těšína': 'from-pink-500 to-pink-600',
  'Českém Těšíně': 'from-pink-500 to-pink-600',
  'Českému Těšínu': 'from-pink-500 to-pink-600',
};

// Funkce pro získání barvy města
export const getCityColor = (cityName) => {
  return cityColors[cityName] || 'from-emerald-500 to-cyan-500';
};

// Seznam měst pro zobrazení
export const moravskoslezskaCities = [
  'Opava',
  'Ostrava', 
  'Nový Jičín',
  'Frýdek-Místek',
  'Karviná',
  'Havířov',
  'Třinec',
  'Český Těšín'
];

// Barvy pro region
export const regionColors = {
  'Moravskoslezský kraj': 'from-blue-500 to-purple-500',
  'Moravskoslezského kraje': 'from-blue-500 to-purple-500',
  'Moravskoslezském kraji': 'from-blue-500 to-purple-500',
};