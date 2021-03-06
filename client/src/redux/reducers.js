import { combineReducers } from 'redux';

// import example from '@/containers/Example/reducer';
import Cards from '@/containers/Cards/reducer';
import Register from '@/containers/Register/reducer';
import Login from '@/containers/Login/reducer';
import CriarCard from '@/containers/CriarCard/reducer';
import EditCard from '@/containers/EditCard/reducer';

/*
  Conforme a aplicação cresce, é preciso separar o reducer em pequenas partes para
  melhor gerenciamento do state, e para "unir" todos os reducers e passar para a store,
  se usa uma "helper function" chamada `combineReducers`
*/
export default combineReducers({
  // example,
  Cards,
  Register,
  Login,
  CriarCard,
  EditCard,
});
