import { useEffect, useRef } from "react"
import { useState } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true);  //En este caso para saber si el componente esta montado
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    })


    useEffect(() => { // Cuando el componente se carga por primera vez
       
        return () => { // Cuando el componente se desmonta
        
            isMounted.current = false;

        }

    }, [])


    useEffect( () => {

        setState({ data: null, loading: true, error: null})
        
        fetch( url )
             .then( resp => resp.json() )
             .then( data => {  
                 
                // Si el componente esta montado actualiza el estado
                if( isMounted.current ){
  
                    setState({
                        data,
                        loading: false,
                        error: null
                    });
                }

             });

    }, [url]); // Se ejecuta cuando la variable url cambie




     return state;

}
