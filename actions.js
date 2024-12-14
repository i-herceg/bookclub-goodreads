export const SET_KNJIGE = 'SET_KNJIGE';
export const OZNACI_PROCITANU = 'OZNACI_PROCITANU';
export const DODAJ_TRENUTNO_CITAM = 'DODAJ_TRENUTNO_CITAM';
export const DODAJ_ZELIM_PROCITATI = 'DODAJ_ZELIM_PROCITATI';
export const DODAJ_RECENZIJU = 'DODAJ_RECENZIJU';

export const setKnjige = (knjige) => ({
  type: SET_KNJIGE,
  payload: knjige,
});

export const oznaciProcitanu = (bookId) => ({
  type: OZNACI_PROCITANU,
  payload: bookId,
});

export const dodajTrenutnoCitam = (bookId) => ({
  type: DODAJ_TRENUTNO_CITAM,
  payload: bookId,
});

export const dodajZelimProcitati = (bookId) => ({
  type: DODAJ_ZELIM_PROCITATI,
  payload: bookId,
});

export const dodajRecenziju = (recenzija) => ({
  type: DODAJ_RECENZIJU,
  payload: recenzija,
});
