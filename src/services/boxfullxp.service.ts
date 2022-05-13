//Note : This service is temporary, it will contain all the utilities that will enable the Box Full Xp feature
import {gql} from "@apollo/client";

//Todo (zack) : Refactor later
type MutationOperation = () => Promise<any>

const HAS_PURCHASED_BEGINNER_BOX = gql`
    mutation HasPurchasedBeginnerBox {
        hasPurchasedBeginnerBox(isBeginnerBox: true) {
            success
        }
    }
`;

const persistMutation = (mutation: MutationOperation) => {
    mutation().then((data) => {
        console.log(data);
    }).catch(e => {
        //Todo : Handle error with a UI toaster or someting of the like
        console.error(e)
    })
}

const persistBoxPurchaseOnRegister = () => {
    let persist = false;
    if (localStorage.getItem("isBoxBeginner") === "true") {
        //Todo (zack) : Address cookie removal bug on Multiple DOM renders
        // localStorage.removeItem("isBoxBeginner")
        persist = true;
    }
    return persist;
}

const persistBoxPurchaseOnConfirmation = (isLoggedIn: boolean, mutation: MutationOperation) => {
    if (isLoggedIn) {
        //Persist to DB
        persistMutation(mutation)
    } else {
        //Store cookie -> we will persist box later
        (localStorage.getItem("isBoxBeginner") === "true") || localStorage.setItem("isBoxBeginner", "true")
    }
}

//GraphQL Operations
export {HAS_PURCHASED_BEGINNER_BOX}

//Utilities
export {persistBoxPurchaseOnConfirmation, persistBoxPurchaseOnRegister}

