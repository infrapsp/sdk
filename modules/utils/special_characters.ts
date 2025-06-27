/* Replace special characters and removes the ones that could not be replaced */
export function normalizeSpecialCharacters(text: string): string {
  const specialCharacters = 'ÀÁÂÃÄÉÈËÊÍÌÏÎÓÒÕÖÔÚÙÜÛÇ';
  const characters = 'AAAAAEEEEIIIIOOOOOUUUUC';
  const regex = new RegExp('[A-Z0-9]', 'g');

  const updatedText = (text || '')
    .toUpperCase()
    .split('')
    .map((character) => {
      const index = specialCharacters.indexOf(character);

      if (index >= 0) {
        return characters[index];
      }

      return character;
    })
    .join('');

  const match = updatedText.match(regex) || [];

  return match.join('');
}
