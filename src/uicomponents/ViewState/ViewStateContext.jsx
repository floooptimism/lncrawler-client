import { useContext, useState, createContext } from 'react';

const ViewStateContext = createContext();

export default function ViewStateProvider(props){

    const [viewState, setViewState] = useState([props.initialViewState, props.initialViewStateParam]);
    // * View state format
    // {
    //     viewState: [
    //            page,
    //            param
    //          ]

    return (
        <ViewStateContext.Provider value={{viewState, setViewState}}>
            {props.children}
        </ViewStateContext.Provider>
    )
}

export function useViewState(){
    return useContext(ViewStateContext);
}