export const hasBoxBeginnerUrl = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("isBeginnerBox")

    return term && (term === "true");
}