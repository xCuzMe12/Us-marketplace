import { ReactNode } from "react"

interface Props{
    children: ReactNode;
    btnName: string;
    //ker smo nardil tko da je color optional mormo to se tle povedat z ? in da ne bi po nesrec nastimal barvo k je ni, jih loh nastejemo:
    color?: "primary" | "secondary" | "danger" | "warning" | "success" | "info" | "light" | "bg-dark";    
    onSelectBtn: (btnName: string) => void;
}

const Button = ({children, btnName, color = "primary", onSelectBtn}: Props) => {  //default value za color, se zmer ga loh zamenas
  return (
    <button className= {"btn btn-" + color} onClick={() => {onSelectBtn(btnName)}}>{children}</button>
  )
}

export default Button


