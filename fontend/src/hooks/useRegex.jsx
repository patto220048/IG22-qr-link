const useRegex = (input, socialName)=> {
    let regex = /https:\/\//i;
    console.log(regex)
    return regex.test(input);
}
export default useRegex;