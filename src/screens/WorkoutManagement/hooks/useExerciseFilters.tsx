import { useState, useEffect } from 'react';
import { Exercise } from '../../../hooks/useExerciseGithubDB';

export default function useExerciseFilters(exercises: Exercise[] | null) {
  const [filters, setFilters] = useState({
    search: '',
    bodyPart: '',
    target: '',
    equipment: '',
  });
  
  const [sortOption, setSortOption] = useState('name_asc');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  
  // Options uniques pour les filtres
  const [filterOptions, setFilterOptions] = useState({
    bodyParts: [] as string[],
    targets: [] as string[],
    equipments: [] as string[],
  });

  // Extraire les options de filtrage des exercices
  useEffect(() => {
    if (exercises) {
      // Extraire les valeurs uniques pour chaque filtre
      const bodyParts = [...new Set(exercises.map(ex => ex.bodyPart).filter(Boolean))];
      const targets = [...new Set(exercises.map(ex => ex.target).filter(Boolean))];
      const equipments = [...new Set(exercises.map(ex => ex.equipment).filter(Boolean))];
      
      setFilterOptions({
        bodyParts: bodyParts.filter((bp): bp is string => bp !== undefined).sort(),
        targets: targets.sort(),
        equipments: equipments.sort(),
      });
    }
  }, [exercises]);

  // Appliquer les filtres et le tri
  useEffect(() => {
    if (!exercises) return;
    
    let result = [...exercises];
    
    // Appliquer les filtres
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(searchLower) ||
        (ex.target && ex.target.toLowerCase().includes(searchLower)) ||
        (ex.bodyPart && ex.bodyPart.toLowerCase().includes(searchLower)) ||
        (ex.equipment && ex.equipment.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.bodyPart) {
      result = result.filter(ex => ex.bodyPart === filters.bodyPart);
    }
    
    if (filters.target) {
      result = result.filter(ex => ex.target === filters.target);
    }
    
    if (filters.equipment) {
      result = result.filter(ex => ex.equipment === filters.equipment);
    }
    
    // Appliquer le tri
    switch (sortOption) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'target_asc':
        result.sort((a, b) => (a.target || '').localeCompare(b.target || ''));
        break;
      case 'equipment_asc':
        result.sort((a, b) => (a.equipment || '').localeCompare(b.equipment || ''));
        break;
    }
    
    setFilteredExercises(result);
  }, [exercises, filters, sortOption]);

  // Fonction pour changer les filtres
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      search: '',
      bodyPart: '',
      target: '',
      equipment: '',
    });
    setShowFilterModal(false);
  };

  return {
    filters,
    filterOptions,
    sortOption,
    filteredExercises,
    showFilterModal,
    showSortModal,
    setFilters,
    setSortOption,
    setShowFilterModal,
    setShowSortModal,
    handleFilterChange,
    resetFilters
  };
}