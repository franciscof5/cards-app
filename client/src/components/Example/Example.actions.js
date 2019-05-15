/*      ===========  Actions ===========
  Redux "Actions" são apenas "objetos" onde possuem o "type" da action
  e outro qualquer tipo de dado (ideal colocar em uma chave "payload"),
  que vai para o reducer, onde "trata" essa action
*/
const actionExample = () => {
  console.log('Example Action');

  return {
    type: 'TOGGLE',
  };
};

export { actionExample };
