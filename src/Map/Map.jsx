
import { Map, Marker } from "pigeon-maps"

function MyMap() {
  return (
    <div>
      <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11} >
        <Marker width={50} anchor={[50.879, 4.6997]} />
      </Map>
    </div>
  )
}
export default MyMap;