import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "components";

const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession {
    createCheckoutSession(data: "checkout") {
      redirectUrl
    }
  }
`;

const CheckoutFullXp: React.FC = () => {
  const [createCheckoutSession, { data, loading, error }] = useMutation(
    CREATE_CHECKOUT_SESSION,
    {
      onCompleted(data) {
        const redirectUrl = data.createCheckoutSession.redirectUrl;
        window.location.replace(redirectUrl);
      },
    },
  );
  // if (loading) return <p>Submitting...</p>;
  //Todo (zack) printing custom errors
  if (error) return <p>Submission error! ${error.message}</p>;

  //Todo (zack) deal with mutation types later
  return (
    <Button
      onClick={createCheckoutSession as any}
      id="commande-box-etape-suivante-paiement"
      className="w-full"
      type={"green"}
    >
      Commander ma box
    </Button>
  );
};

export default CheckoutFullXp;
