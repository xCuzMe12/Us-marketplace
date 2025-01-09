function Message(){
    const name = "Volkov";
    if(name)
        return <h1>Hello {name}</h1>;  //JavaScript XML
    return <h1>Hello World</h1>;
}

export default Message;