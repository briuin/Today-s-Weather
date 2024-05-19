import { useCallback } from "react";
import lookup from "country-code-lookup";

const convertFirstCharacterToUpper = (text: string) => text.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());

const useCountryCodeLookup = () => {
  const countryCodeLookup = useCallback((keyword: string): string => {
    const keywordWithFirstUpper = convertFirstCharacterToUpper(keyword);

    try {
      const isoResult = lookup.byIso(keywordWithFirstUpper);
      if (isoResult) {
        return isoResult.iso2;
      }
    } catch (e) {}

    const countryResult = lookup.byCountry(keywordWithFirstUpper);

    return countryResult?.iso2 || "";
  }, []);
  return { lookup: countryCodeLookup };
};

export default useCountryCodeLookup;
