import Library from "../../pages/Library/Library";
import Content from "../Content/Content";
import { useViewState } from "./ViewStateContext"

// * PAGES CONSTANTS
import { defaultPage, PAGES } from "../../constants/pages";

function ViewStateRenderer(props){
    const {viewState, setViewState} = useViewState();

    const Component = (function getCurrentPage(){
        const [page, param] = viewState;
        if(!page || page.trim() == ""){
            return PAGES[defaultPage];
        }
        return PAGES[page.toLowerCase()];
    })()

    return (
        <Content><Component param={viewState[1]} /></Content>
    )
}

export default ViewStateRenderer;