import { Driver, DriverStore, LocationStore, MarkerData } from '@/types/type';
import { create } from 'zustand' ; 

export const useLocationStore = create<LocationStore>((set) => ({
    userAddress : null , 
    userLongitude : null ,
    userLatitude : null ,
    destinationAddress : null , 
    destinationLatitude : null ,
    destinationLongitude : null ,
    setUserLocation : ({
        latitude ,
        longitude ,
        address ,
    } : {latitude : number , longitude : number , address : string }) => {
        set(() => (
            {
                userAddress : address ,
                userLongitude : longitude ,
                userLatitude : latitude ,
            }
        ))
    },
    setDestinationLocation : ({
        latitude ,
        longitude ,
        address ,
    }) => {
        set(() => (
            {
                destinationAddress : address ,
                destinationLongitude : longitude ,
                destinationLatitude : latitude ,
            }
        ))
    }


}));

export const useDriverStore = create<DriverStore>((set) => ({
    drivers : [] as MarkerData[],
    selectedDriver : null ,
    setDrivers : (drivers : MarkerData[]) => {
        set(() => ({ drivers : drivers }))
    },
    setSelectedDriver : (driverId : number) => set(() => ({selectedDriver : driverId})) ,
    clearSelectedDriver : () => set(() => ({selectedDriver : null})) ,
    

 }));