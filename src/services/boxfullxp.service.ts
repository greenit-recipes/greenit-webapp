//Note : This service is temporary, it will contain all the utilities that will enable the Box Full Xp feature
import { gql } from '@apollo/client';

//Todo (zack) : Refactor later
type MutationOperation = () => Promise<any>;

const HAS_PURCHASED_BEGINNER_BOX = gql`
  mutation HasPurchasedBeginnerBox {
    hasPurchasedBeginnerBox(isBeginnerBox: true) {
      success
    }
  }
`;

const persistMutation = (mutation: MutationOperation) => {
  mutation()
    .then(data => {
      // console.log(data)
    })
    .catch(e => {
      //Todo : Handle error with a UI toaster or someting of the like
      // console.error(e)
    });
};

const beginnerBoxCookieExist = () => {
  return localStorage.getItem('isBeginnerBox') === 'true';
};

const persistBoxPurchaseOnRegister = () => {
  //Todo (zack) : Address cookie removal bug on Multiple DOM renders
  //let persist = false;
  // if (localStorage.getItem("isBeginnerBox") === "true") {
  //     localStorage.removeItem("isBeginnerBox")
  //     persist = true;
  // }
  return localStorage.getItem('isBeginnerBox') === 'true';
};

//Investigate for bugs
const persistBoxPurchaseOnFirstLogin = (mutation: MutationOperation) => {
  persistMutation(mutation);
  localStorage.getItem('isBeginnerBox') === 'true' &&
    localStorage.removeItem('isBeginnerBox');
};

const persistBoxPurchaseOnConfirmation = (
  isLoggedIn: boolean,
  mutation: MutationOperation,
) => {
  //Refactor
  if (isLoggedIn) {
    //Persist to DB
    persistMutation(mutation);
  } else {
    //Store cookie -> we will persist box later
    localStorage.getItem('isBeginnerBox') === 'true' ||
      localStorage.setItem('isBeginnerBox', 'true');
  }
};

//GraphQL Operations
export { HAS_PURCHASED_BEGINNER_BOX };

//Utilities
export {
  persistBoxPurchaseOnConfirmation,
  persistBoxPurchaseOnRegister,
  persistBoxPurchaseOnFirstLogin,
  beginnerBoxCookieExist,
};
