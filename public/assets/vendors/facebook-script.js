if (window.location.host === "greenitcommunity.com") {
    fbq('track', 'InitiateCheckout', {
        value: 20,
        currency: 'euros',
    });
}