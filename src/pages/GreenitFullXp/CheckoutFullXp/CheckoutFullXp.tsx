import React from "react";
import {gql, useMutation} from "@apollo/client";


const CREATE_CHECKOUT_SESSION = gql`
    mutation createCheckoutSession {
        createCheckoutSession(data: "checkout") {
            redirectUrl
        }
    }
`;

const CheckoutFullXp: React.FC = () => {
    const [createCheckoutSession, { data, loading, error }] = useMutation(CREATE_CHECKOUT_SESSION, {
        onCompleted(data) {
            const redirectUrl = data.createCheckoutSession.redirectUrl;
            window.location.replace(redirectUrl)
        }
    });
    // if (loading) return <p>Submitting...</p>;
    //Todo (zack) printing custom errors
    if (error) return <p>Submission error! ${error.message}</p>;

    //Todo (zack) deal with mutation types later
    return (
        <div className="flex justify-center">
            <button onClick={createCheckoutSession as any}
                id="etape-suivante-paiement"
                className="h-10 rounded-lg bg-green w-32 lg:w-72 text-white"
            >
                        Étape suivante
            </button>
        </div>

    )
}

export default CheckoutFullXp;