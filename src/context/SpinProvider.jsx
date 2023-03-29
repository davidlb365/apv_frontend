import { createContext, useState } from "react";

const SpinContext = createContext()

export const SpinProvider = ({children}) => {

    const [spinning, setSpinning] = useState(false)

    return(
        <SpinContext.Provider 
            value={{
                spinning,
                setSpinning
            }}
        >

            {children}
        </SpinContext.Provider>
    )
}


export default SpinContext