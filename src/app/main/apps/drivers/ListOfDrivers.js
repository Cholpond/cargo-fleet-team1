
const ListOfDrivers = () => {

    const fetchDrivers = () => {
        try{
        fetch('https://cargofleet-api.fly.dev/team1/api/drivers')
        .then(response => response.json)
        .then(data => console.log(data))
        } catch(error){
            console.log('error', error)
        }
    }



    return(
        <div>
            
        </div>
    )
}