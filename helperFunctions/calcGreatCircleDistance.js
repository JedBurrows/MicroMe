import {_toRadians} from './toRadians';

const _calcGreatCircleDistance = (locationA, locationZ) => {
    const latA = locationA.latitude;
    const latZ = locationZ.latitude;
    const lonA = locationA.longitude;
    const lonZ = locationZ.longitude;

    const R = 6371e3 // earths radius
    const p1 = _toRadians(latA);
    const p2 = _toRadians(latZ);
    const dg = _toRadians(lonZ - lonA);
    const d = Math.acos(
        Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(dg)
    ) * R

    return isNaN(d) ? 0 : d;
}

export { _calcGreatCircleDistance };