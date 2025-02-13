import Menubar from "@/Components/Public/Menubar";

export default function PublicLayout({children}){
    return (
        <>
            <Menubar/>
            {children}
        </>
    )
}