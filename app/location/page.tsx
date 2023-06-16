import { createLocations } from 'mint-works';
import { createLocationsConstructor } from 'mint-works/dist/location';

import { Location } from './Location';

export default function Page() {
  const locations = createLocationsConstructor(2, createLocations(2));
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4">
      {locations.map((location) => {
        return <Location key={location.name} location={location} />;
      })}
    </div>
  );
}
