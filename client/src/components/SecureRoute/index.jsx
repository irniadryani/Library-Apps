import { Navigate, useLocation } from 'react-router-dom';  
import useStore from '../../store/index';  
import { useQuery } from 'react-query';  
import { currentUserFn } from '../../api/Auth/Auth';  
import { toast } from 'react-toastify'; 
import { tailspin } from 'ldrs'

const SecureRoute = ({ children }) => {
    const userSession = useStore((state) => state.userSession);  
    const location = useLocation();  
    const store = useStore();  
    tailspin.register()

    const { isLoading } = useQuery(['authUser'], currentUserFn, {
        onSuccess(data) {
            console.log("User authenticated:", data.data);
            store.setAuthUser(data.data);  
            store.setUserSession(true);   
            store.setRequestLoading(false);  
        },
        onError(error) {
            console.log("Authentication error:", error);
            store.setRequestLoading(false); 
            store.logout();  

            if (Array.isArray(error)) {
                error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error(error.message, {
                    position: 'top-right',
                });
            }
        },
    });

    console.log("isLoading:", isLoading, "userSession:", userSession);

    if (isLoading) {
        return <div className='flex items-center justify-center my-80'><l-tailspin
        size="40"
        stroke="5"
        speed="0.9" 
        color="black" 
      ></l-tailspin></div>;  
    }

    return userSession ? (
        <>{children}</>
    ) : (
        <Navigate to='/login' state={{ prevLocation: location.pathname }} />
    );
};

export default SecureRoute;
