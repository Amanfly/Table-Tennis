//local storage

export const get_localStorage = key =>
{
    let data=localStorage.getItem(key)
    return data
};


export const set_localStorage = (data, key) =>
{
localStorage.setItem(key,typeof(data)==='object'?JSON.stringify(data):data);
};


export const remove_localStorage = (key) => {
    localStorage.removeItem(key);
}
