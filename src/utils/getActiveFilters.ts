import { TraitStatus } from "../interfaces";

// TODO: Configure this so it also returns the trait type as well
export function getActiveFilters(
  traits: Record<string, Record<string, TraitStatus>>
) {
  const traitsArr = Object.values(traits).map((_traits) => {
    return _traits;
  });

  const allTraits = traitsArr.reduce((prev, cur) => {
    return { ...prev, ...cur };
  }, {});

  const _activeFilters = Object.entries(allTraits).filter(
    ([name, traitInfo]) => {
      return traitInfo.checked;
    }
  );

  const activeFilters = _activeFilters.map(([traitName, traitInfo]) => {
    return { value: traitName, label: traitName };
  });

  return activeFilters;
}
