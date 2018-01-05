const initialstate={
    list:[],
    count:0
}
const reducer=(state=initialstate,info)=>{
    let {type,payload}=info;
    console.log(info,type,payload)
    switch(type){
        case "INCREASE":
            return Object.assign({},state,{count:state.count+1});
        case "DECREASE":
            return Object.assign({},state,{count:state.count-1});
        default:
            return state;
    }
    return state;
}
export default reducer;