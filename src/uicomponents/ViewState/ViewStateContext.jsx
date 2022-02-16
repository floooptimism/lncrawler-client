import { useContext, useState, createContext } from 'react';

const ViewStateContext = createContext();

export default function ViewStateProvider(props){

    const [viewState, setviewstate] = useState([props.initialViewState, props.initialViewStateParam]);
    // * View state format
    // {
    //     viewState: [
    //            page,
    //            param
    //          ]

    function setViewState(newViewState){
        console.log("New view state", newViewState);
        newViewState[0] = newViewState[0].toLowerCase();
        setviewstate([...newViewState]);
    }

    return (
        <ViewStateContext.Provider value={{viewState, setViewState}}>
            {props.children}
        </ViewStateContext.Provider>
    )
}

export function useViewState(){
    return useContext(ViewStateContext);
}