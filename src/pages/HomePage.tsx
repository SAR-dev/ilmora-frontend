import { usePocket } from "contexts/PocketContext"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const HomePage = () => {
    const {userData} = usePocket()
    const navigate = useNavigate()

    useEffect(() => {
      if(userData.isTeacher){
        navigate("/t")
        return;
      }
      if(userData.isStudent){
        navigate("/s")
        return;
      }
    }, [userData])
    

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="flex flex-col gap-2 items-center">
                <span className="loading loading-spinner text-primary loading-lg" />
                <div className="flex gap-2">
                    <span className="loading loading-dots loading-xs" />
                    Choosing UI Layout 
                    <span className="loading loading-dots loading-xs" />
                </div>
            </div>
        </div>
    )
}

export default HomePage