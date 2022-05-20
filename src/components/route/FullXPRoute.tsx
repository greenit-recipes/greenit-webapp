import {Redirect, Route} from "react-router-dom";
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_FEATURE_BY_NAME} from "../../services/feature.service";
import {Loading} from "../layout";

const FullXPRoute = ({component: Component, restricted, ...rest}: any) => {

    const {loading, data} = useQuery(GET_FEATURE_BY_NAME, {
        variables: {
            name: 'is_greenit_full_xp'
        },
        errorPolicy: "all"
    });

    return (
        loading ? <Loading/> :
            (data?.featureFlag.isActive ?
                <Route {...rest} render={(props) => <Component key={Date.now()} {...props} />}/> :
                <Redirect to="/"/>)
    )
};

export default FullXPRoute;
