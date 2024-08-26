import { Navigate, useLocation } from 'react-router-dom';  
import useStore from '../../store/index';  
import { useQuery } from 'react-query';  
import { currentUserFn } from '../../api/Auth/Auth';  
import { toast } from 'react-toastify'; 
import { tailspin } from 'ldrs'

const SecureRoute = ({ children }) => {
  // Retrieve the current user session from the global state
  const userSession = useStore((state) => state.userSession);  
  // Get the current location (used for redirecting after login)
  const location = useLocation();  
  // Access the store for state management
  const store = useStore();  
  // Register the spinner (assumed to be a library or component setup)
  tailspin.register();

  // Use React Query to fetch the current authenticated user's information
  const { isLoading } = useQuery(['authUser'], currentUserFn, {
      onSuccess(data) {
          // On successful fetch, update the global state with user data
          console.log("User authenticated:", data.data);
          store.setAuthUser(data.data);  
          store.setUserSession(true);   
          store.setRequestLoading(false);  
      },
      onError(error) {
          // On error, handle authentication failure
          console.log("Authentication error:", error);
          store.setRequestLoading(false); 
          store.logout();  

          // Display error messages
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

  // Display a loading spinner while the authentication status is being determined
  if (isLoading) {
      return (
          <div className='flex items-center justify-center my-80'>
              <l-tailspin
                  size="40"
                  stroke="5"
                  speed="0.9" 
                  color="black" 
              ></l-tailspin>
          </div>
      );  
  }

  // Render child components if user is authenticated; otherwise, redirect to the login page
  return userSession ? (
      <>{children}</>
  ) : (
      <Navigate to='/login' state={{ prevLocation: location.pathname }} />
  );
};

export default SecureRoute;
