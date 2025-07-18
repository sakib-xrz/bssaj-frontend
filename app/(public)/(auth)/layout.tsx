import Navbar from "@/components/shared/navbar"

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default layout