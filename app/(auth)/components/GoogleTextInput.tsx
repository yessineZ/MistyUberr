import { Image, Text, View } from 'react-native';
import React from 'react';
import { GoogleInputProps } from '@/types/type';
import { icons } from '@/constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: 50, borderRadius: 15, marginBottom: 20 }, containerStyle]}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where do you want to go?"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            shadowColor: '#d4d4d4',
          },
          textInput: {
            backgroundColor: textInputBackgroundColor,
            paddingHorizontal: 15,
            borderRadius: 200,
            height: 40,
            width: '90%',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || '#ffffff',
            marginTop: 10,
            borderRadius: 15,
            shadowColor: '#d4d4d4',
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            paddingHorizontal: 15,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: GooglePlacesApiKey,
          language: 'en', 
        }}
        renderLeftButton={() => (
          <View>
            <Image source={icon ? icon : icons.search} style={{ width: 24, height: 24 }} resizeMode="contain" />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: 'gray',
          placeholder: initialLocation ?? 'Where do you want to go?',
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
