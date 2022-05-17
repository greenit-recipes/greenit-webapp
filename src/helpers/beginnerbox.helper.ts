const getUrl = () => {
    return new URLSearchParams(window.location.search)
}

export const getMenuStep = () => {
    const queryParams = getUrl()
    const term = queryParams.get("step")
    return term
}


export const hasBoxBeginnerUrl = () => {
    const queryParams = getUrl()
    const term = queryParams.get("isBeginnerBox")

    return term && (term === "true");
}

