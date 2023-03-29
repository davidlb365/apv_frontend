import {useContext} from 'react'
import SpinContext from '../context/SpinProvider'

const useSpin = () => {
    return useContext(SpinContext)
}

export default useSpin