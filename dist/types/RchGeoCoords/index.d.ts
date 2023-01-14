/// <reference types="react" />
declare function RchGeoCoords({ defaultTownName, newCoordsCallback, countryFilter }: {
    defaultTownName: any;
    newCoordsCallback: any;
    countryFilter?: any;
}): {
    getCoords: () => any;
    render: () => JSX.Element;
};
export default RchGeoCoords;
