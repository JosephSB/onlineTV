import axios from "axios"
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { URL_API } from "../config";

const ListLives = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['lives'], queryFn: async () => {
        const resp = await axios.get(`${URL_API}live/listLives`);
        if(resp.status === 200) {
            return resp.data.data
        }
        return []
    }, retry: 1, refetchOnWindowFocus: false });

    if(isLoading){
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    }

    
    if(!data || isError){
        return (
            <div>
                <p>Error</p>
            </div>
        )
    }

    return(
        <div className="list-lives">
            {
                data.map( (item) => (
                    <NavLink to={`/live/${item.live_id}`}>
                         <div className="card-live" key={item.live_id}>
                            <div className="card-img">
                                transmision {item.live_id}
                            </div>
                            <p className="card-title">{item.fullname}</p>
                        </div>
                    </NavLink>
                ) )
            }
        </div>
    )
} 

export default ListLives