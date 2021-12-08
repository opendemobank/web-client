export const getToken = ()=> `Bearer ${localStorage.getItem('accessToken')}`; 


export const checkUnauthorisedAccess = (error)=>{
    if(error == 'Error: Request failed with status code 401'){
        
        console.log('token expired');
        window.alert("Login Session Expired!!!\n Please try login again.")
        localStorage.clear()
        window.location.assign('/');
    }
}