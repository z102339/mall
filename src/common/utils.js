export function debounce(func,time){
  let timerId=null
  return function(...args){
    timerId!=null&&clearTimeout(timerId)
    timerId=setTimeout(()=>{
      func.apply(this,args)
    },time)
  }
}
