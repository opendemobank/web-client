export const getToken = ()=> `Bearer ${localStorage.getItem('accessToken')}`; 


export const checkUnauthorisedAccess = (error)=>{
    if(error.status == '401'){
        console.log('token expired');
        localStorage.clear()
        window.location.assign('/');
    }
}