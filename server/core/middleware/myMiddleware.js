
const myMiddleWare = (options)=> {
  return (req, res, next)=>{
    console.log('myMiddleWare options=>', options)
    next()
  }
}

export default myMiddleWare
