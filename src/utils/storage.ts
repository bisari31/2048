export const getBestScore = () => Number(localStorage.getItem('best'));
export const getScore = () => Number(localStorage.getItem('score'));
export const getGrid = (): number[][] =>
  JSON.parse(localStorage.getItem('grid') || '[]');
