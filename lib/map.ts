import {Driver, MarkerData} from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
                                            data,
                                            userLatitude,
                                            userLongitude,
                                        }: {
    data: Driver[];
    userLatitude: number;
    userLongitude: number;
}): MarkerData[] => {
    return data.map((driver) => {
        const latOffset = (Math.random() - 0.5) * 0.01; 
        const lngOffset = (Math.random() - 0.5) * 0.01; 

        return {
            latitude: userLatitude + latOffset,
            longitude: userLongitude + lngOffset,
            title: `${driver.first_name} ${driver.last_name}`,
            ...driver,
        };
    });
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  // Ensure all necessary coordinates are available
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    const timesPromises = markers.map(async (marker) => {
      try {
        // Fetch time from driver to user
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
        );
        const dataToUser = await responseToUser.json();
        const timeToUser = dataToUser.routes[0]?.legs[0]?.duration?.value; // Time in seconds

        if (!timeToUser) {
          throw new Error(`Failed to get time from driver to user for marker ${marker.id}`);
        }

        // Fetch time from user to destination
        const responseToDestination = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
        );
        const dataToDestination = await responseToDestination.json();
        const timeToDestination = dataToDestination.routes[0]?.legs[0]?.duration?.value; // Time in seconds

        if (!timeToDestination) {
          throw new Error(
            `Failed to get time from user to destination for marker ${marker.id}`
          );
        }

        // Calculate total time and price
        const totalTime = (timeToUser + timeToDestination) / 60; // Time in minutes
        const price = (totalTime * 0.5).toFixed(2); // Price calculation

        // Return marker data with calculated time and price
        return { ...marker, time: totalTime, price };
      } catch (error) {
        console.error(`Error processing marker ${marker.id}:`, error);
        return { ...marker, time: null, price: null }; // Return marker with null time/price in case of error
      }
    });

    // Wait for all marker times to be processed
    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};



export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }
}
