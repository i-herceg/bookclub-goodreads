import {
  SET_KNJIGE,
  OZNACI_PROCITANU,
  DODAJ_TRENUTNO_CITAM,
  DODAJ_ZELIM_PROCITATI,
  DODAJ_RECENZIJU,
} from './actions';

const initialState = {
  knjige: [],
  statusKnjiga: {}, 
  recenzije: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KNJIGE:
      statusKnjiga = {};
      action.payload.forEach((knjiga) => {
        statusKnjiga[knjiga.bookId] = { ...knjiga, status: '' };
      });
      return {
        ...state,
        knjige: action.payload,
        statusKnjiga,
      };
    case OZNACI_PROCITANU:
      return {
        ...state,
        statusKnjiga: {
          ...state.statusKnjiga,
          [action.payload]: { ...state.statusKnjiga[action.payload], status: 'Pročitano' },
        },
      };
    case DODAJ_TRENUTNO_CITAM:
      return {
        ...state,
        statusKnjiga: {
          ...state.statusKnjiga,
          [action.payload]: { ...state.statusKnjiga[action.payload], status: 'Trenutno čitam' },
        },
      };
    case DODAJ_ZELIM_PROCITATI:
      return {
        ...state,
        statusKnjiga: {
          ...state.statusKnjiga,
          [action.payload]: { ...state.statusKnjiga[action.payload], status: 'Želim pročitati' },
        },
      };
    case DODAJ_RECENZIJU:
      const { bookId, ocjena, recenzija } = action.payload;
      return {
        ...state,
        recenzije: {
          ...state.recenzije,
          [bookId]: [...(state.recenzije[bookId] || []), { ocjena, recenzija }],
        },
      };
    default:
      return state;
  }
};

export default reducer;
