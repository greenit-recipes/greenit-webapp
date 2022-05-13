export const hasBoxBeginnerUrl = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("isBoxBeginner")

    return term && (term === "true");
}