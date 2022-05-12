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
            console.log(redirectUrl);
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
                className="px-6 py-3 text-white duration-100 bg-green rounded-md shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2"
            >
                Checkout
            </button>
        </div>

    )
}

export default CheckoutFullXp;