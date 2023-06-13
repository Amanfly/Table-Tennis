import cookies from 'js-cookie';

export const get_cookie = cookieName =>{

    let cookieParsed =
    Cookies.get(cookieName);
    if (cookieParsed) {
        return JSON.parse(cookieParsed);
    } else{
        return cookieParsed;
    }
}

export const get_cookie_name = () =>{
    return 
    JSON.parse(Cookies.get('name'));
}



export const set_cookie =(cookieName, data, options={
    expires:1}) => {
        return Cookies.set(cookieName), data, options)
    }


export const remove_cookie = cookieName =>
{ return Cookies.remove(cookieName);
}
